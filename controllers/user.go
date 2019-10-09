package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/spankie/organizer/models"

	"github.com/astaxie/beego"
)

// Operations about Users
type UserController struct {
	beego.Controller
}

// @Title CreateUser
// @Description create users
// @Param	body		body 	models.User	true		"body for user content"
// @Success 200 {int} models.User.Id
// @Failure 403 body is empty
// @router / [post]
func (u *UserController) Post() {
	var user models.User
	err := json.Unmarshal(u.Ctx.Input.RequestBody, &user)
	if err != nil {
		log.Printf("Unmarshal user error: %v\n", err)
		SendJSONResponse(&u.Controller, RespData{"error": "Bad Request"}, http.StatusBadRequest)
		u.ServeJSON()
		return
	}
	prevUser, err := models.GetUser("email", user.Email)
	if err == nil {
		SendJSONResponse(&u.Controller, RespData{"error": "user with email already exists"}, http.StatusBadRequest)
		u.ServeJSON()
		return
	} else {
		log.Printf("Previous user error: %v", err)
		log.Printf("Prevuser: %v", prevUser)
	}
	// hashpassword here
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Encrypt password error: %v\n", err)
		SendJSONResponse(&u.Controller, RespData{"error": http.StatusText(http.StatusInternalServerError)}, http.StatusInternalServerError)
		u.ServeJSON()
		return
	}
	user.Password = string(hashedPassword)
	// log.Printf("user: %v\n", user)
	errs := models.AddUser(&user)
	if len(errs) > 0 {
		log.Printf("Create User errors: %v\n", errs)
		SendJSONResponse(&u.Controller, RespData{"error": errs}, http.StatusBadRequest)
	} else {
		SendJSONResponse(&u.Controller, RespData{"message": "User created successfully"}, http.StatusCreated)
	}
	u.ServeJSON()
}

// @Title GetAll
// @Description get all Users
// @Success 200 {object} models.User
// @router / [get]
func (u *UserController) GetAll() {
	users := models.GetAllUsers()
	u.Data["json"] = users
	// u.Data["json"] = struct{ name string }{name: "spankie"}
	log.Println(u)
	u.ServeJSON()
}

// @Title Get
// @Description get user by uid
// @Param	uid		path 	string	true		"The key for staticblock"
// @Success 200 {object} models.User
// @Failure 403 :uid is empty
// @router /:uid [get]
func (u *UserController) Get() {
	uid := u.GetString(":uid")
	if uid != "" {
		user, err := models.GetUser("id", uid)
		if err != nil {
			u.Data["json"] = err.Error()
		} else {
			u.Data["json"] = user
		}
	}
	u.ServeJSON()
}

// @Title Update
// @Description update the user
// @Param	uid		path 	string	true		"The uid you want to update"
// @Param	body		body 	models.User	true		"body for user content"
// @Success 200 {object} models.User
// @Failure 403 :uid is not int
// @router /:uid [put]
func (u *UserController) Put() {
	uid := u.GetString(":uid")
	if uid != "" {
		var user models.User
		json.Unmarshal(u.Ctx.Input.RequestBody, &user)
		uu, err := models.UpdateUser(uid, &user)
		if err != nil {
			u.Data["json"] = err.Error()
		} else {
			u.Data["json"] = uu
		}
	}
	u.ServeJSON()
}

// @Title Delete
// @Description delete the user
// @Param	uid		path 	string	true		"The uid you want to delete"
// @Success 200 {string} delete success!
// @Failure 403 uid is empty
// @router /:uid [delete]
func (u *UserController) Delete() {
	uid := u.GetString(":uid")
	models.DeleteUser(uid)
	u.Data["json"] = "delete success!"
	u.ServeJSON()
}

// @Title Login
// @Description Logs user into the system
// @Param	email		body 	*string	true		"email for user login"
// @Param	password		body 	*string	true		"password for user login"
// @Success 200 {string} login success
// @Failure 400 user not exist
// @router /login [post]
func (u *UserController) Login() {
	req := struct {
		Email    string `form:"email"`
		Password string `form:"password"`
	}{}
	if err := json.Unmarshal(u.Ctx.Input.RequestBody, &req); err != nil {
		log.Printf("ParseForm error: %v", err)
		SendJSONResponse(&u.Controller, RespData{"error": "user not exist"}, http.StatusBadRequest)
	}
	log.Printf("Login request: %v\n", req)
	token, errs := models.Login(req.Email, req.Password)
	if len(errs) > 0 {
		SendJSONResponse(&u.Controller, RespData{"error": "user not exist"}, http.StatusBadRequest)
	} else {
		SendJSONResponse(&u.Controller, RespData{"token": token, "message": "Login Successful"}, http.StatusOK)
	}
	u.ServeJSON()
}

// @Title logout
// @Description Logs out current logged in user session
// @Success 200 {string} logout success
// @router /logout [get]
func (u *UserController) Logout() {
	u.Data["json"] = "logout success"
	u.ServeJSON()
}
