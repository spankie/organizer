package models

import (
	"errors"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/astaxie/beego"
	"github.com/jinzhu/gorm"
	"github.com/pusher/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var (
	UserList map[string]*User
)

func init() {
	UserList = make(map[string]*User)
	u := User{
		Password: "password",
		Gender:   "male",
		FullName: "Spankie Dee",
		// Age:      20,
		Address: "Singapore",
		Email:   "spankie@gmail.com",
	}
	UserList["user_11111"] = &u
}

type User struct {
	gorm.Model
	Password string `json:"password"`
	Gender   string `json:"gender"`
	FullName string `json:"full_name"`
	// Age            int          `json:"age"`
	Address        string       `json:"address"`
	Email          string       `json:"email"`
	OrganizationID uint         `json:"organization_id"`
	Organization   Organization `json:"organization" gorm:"foreignkey:OrganizationID"`
}

func AddUser(u *User) []error {
	return DB.Create(u).GetErrors()
}

func GetUser(field string, value interface{}) (u *User, err error) {
	u = &User{}
	if err := DB.Where(fmt.Sprintf("%s = ?", field), value).First(u).Error; err != nil {
		return nil, err
	}
	return u, nil
}

func GetAllUsers() map[string]*User {
	return UserList
}

func UpdateUser(uid string, uu *User) (a *User, err error) {
	if u, ok := UserList[uid]; ok {
		if uu.Email != "" {
			u.Email = uu.Email
		}
		if uu.Password != "" {
			u.Password = uu.Password
		}
		// if uu.Profile.Age != 0 {
		// u.Profile.Age = uu.Profile.Age
		// }
		// if uu.Profile.Address != "" {
		// u.Profile.Address = uu.Profile.Address
		// }
		// if uu.Profile.Gender != "" {
		// u.Profile.Gender = uu.Profile.Gender
		// }
		// if uu.Profile.Email != "" {
		// u.Profile.Email = uu.Profile.Email
		// }
		return u, nil
	}
	return nil, errors.New("User Not Exist")
}

func Login(username, password string) (string, []error) {
	u := &User{}
	log.Printf("email: %s\npassword: %s\n", username, password)
	errs := DB.Where("email = ?", username).First(u).GetErrors()
	if len(errs) > 0 {
		log.Println(errs)
		return "", errs
	}
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	if err != nil {
		log.Println(err)
		return "", []error{err}
	}

	// generate token for the user
	claims := struct {
		Email string `json:"email"`
		jwt.StandardClaims
	}{
		Email: u.Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(7 * 24 * time.Hour).Unix(),
			Issuer:    "api.org.it",
			Id:        strconv.Itoa(int(u.ID)),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signingKey := []byte(beego.AppConfig.String("JWT_SECRET"))
	tokenString, err := token.SignedString(signingKey)
	if err != nil {
		return "", []error{err}
	}

	return tokenString, nil
}

func DeleteUser(uid string) {
	delete(UserList, uid)
}
