package test

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/astaxie/beego"
	. "github.com/smartystreets/goconvey/convey"
	"github.com/spankie/organizer/models"
	_ "github.com/spankie/organizer/routers"
)

// func init() {

// }

func doesBodyContain(b *bytes.Buffer, expected string) bool {
	bodyBytes, err := ioutil.ReadAll(b)
	if err != nil {
		return false
	}
	return strings.Contains(string(bodyBytes), expected)
}

func shouldContainInBody(actual interface{}, expected ...interface{}) string {
	if doesBodyContain(actual.(*bytes.Buffer), expected[0].(string)) {
		return ""
	}
	return fmt.Sprintf("Body does not contain %s", expected[0])
}

func Register() (*httptest.ResponseRecorder, error) {
	u, err := json.Marshal(models.User{
		Password: "password",
		FullName: "Spankie Dee",
		Age:      30,
		Address:  "Ajah, Lagos, Nigeria",
		Email:    "spankie@gmail.com",
		Gender:   "male",
	})
	if err != nil {
		return nil, err
	}
	r, _ := http.NewRequest("POST", "/v1/user", bytes.NewBuffer(u))
	w := httptest.NewRecorder()
	beego.BeeApp.Handlers.ServeHTTP(w, r)
	return w, nil
}

// TestRegister is a sample to run an endpoint test
func TestRegister(t *testing.T) {
	db, err := models.GetDB()
	Convey("GetDB(Register)", t, func() {
		Convey("DB should not return an error", func() {
			So(err, ShouldBeNil)
		})
	})
	defer db.Close()
	w, err := Register()
	if err != nil {
		t.Fatal(err)
	}

	beego.Trace(fmt.Sprintf("testing Register Code[%d]\n%s", w.Code, w.Body.String()))

	Convey("Subject: Test Register Endpoint\n", t, func() {
		Convey("Status Code Should Be 201", func() {
			So(w.Code, ShouldEqual, http.StatusCreated)
		})
		Convey("The Result Should Not Be Empty", func() {
			So(w.Body.Len(), ShouldBeGreaterThan, 0)
		})
		Convey("The result should contain message response: `success`", func() {
			So(w.Body, shouldContainInBody, "successful")
		})
	})
}

// TestLogin is a sample to run an endpoint test
func TestLogin(t *testing.T) {
	db, err := models.GetDB()
	Convey("GetDB(Login)", t, func() {
		Convey("DB should not return an error", func() {
			So(err, ShouldBeNil)
		})
	})
	defer db.Close()
	rr, err := Register()
	if err != nil {
		t.Fatal(err)
	}
	Convey("Subject: Test Register on login\n", t, func() {
		Convey("Status Code Should Be 201", func() {
			So(rr.Code, ShouldEqual, http.StatusCreated)
		})
	})
	u, err := json.Marshal(models.User{Email: "spankie@gmail.com", Password: "password"})
	if err != nil {
		t.Fatal(err)
	}
	r, _ := http.NewRequest("POST", "/v1/user/login", bytes.NewBuffer(u))
	w := httptest.NewRecorder()
	beego.BeeApp.Handlers.ServeHTTP(w, r)

	beego.Trace("testing Login Code [%d]\n%s", w.Code, w.Body.String())

	Convey("Subject: Test Login Endpoint\n", t, func() {
		Convey("Status Code Should Be 200", func() {
			So(w.Code, ShouldEqual, 200)
		})
		Convey("The Result Should Not Be Empty", func() {
			So(w.Body.Len(), ShouldBeGreaterThan, 0)
		})
		Convey("The result should contain token", func() {
			So(w.Body, shouldContainInBody, "token")
		})
	})
}
