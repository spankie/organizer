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

// TestGet is a sample to run an endpoint test
func TestLogin(t *testing.T) {
	u, err := json.Marshal(models.User{Username: "spankie@gmail.com", Password: "password"})
	if err != nil {
		t.Fatal(err)
	}
	r, _ := http.NewRequest("GET", "/v1/user/login", bytes.NewBuffer(u))
	w := httptest.NewRecorder()
	beego.BeeApp.Handlers.ServeHTTP(w, r)

	beego.Trace("testing Login Code [%d]\n%s", w.Code, w.Body.String())

	Convey("Subject: Test Station Endpoint\n", t, func() {
		Convey("Status Code Should Be 200", func() {
			So(w.Code, ShouldEqual, 200)
		})
		Convey("The Result Should Not Be Empty", func() {
			So(w.Body.Len(), ShouldBeGreaterThan, 0)
		})
		Convey("The result should contain message response", func() {
			So(w.Body, shouldContainInBody, "success")
		})
	})
}

// TestGet is a sample to run an endpoint test
func TestRegister(t *testing.T) {
	u, err := json.Marshal(models.User{
		Username: "spankie@gmail.com",
		Password: "password",
		Profile: models.Profile{
			FullName: "Spankie Dee",
			Age:      30,
			Address:  "Ajah, Lagos, Nigeria",
			Email:    "spankie@gmail.com",
			Gender:   "male",
		},
	})
	if err != nil {
		t.Fatal(err)
	}
	r, _ := http.NewRequest("POST", "/v1/user", bytes.NewBuffer(u))
	w := httptest.NewRecorder()
	beego.BeeApp.Handlers.ServeHTTP(w, r)

	beego.Trace("testing Register Code[%d]\n%s", w.Code, w.Body.String())

	Convey("Subject: Test Station Endpoint\n", t, func() {
		Convey("Status Code Should Be 200", func() {
			So(w.Code, ShouldEqual, 200)
		})
		Convey("The Result Should Not Be Empty", func() {
			So(w.Body.Len(), ShouldBeGreaterThan, 0)
		})
		Convey("The result should contain message response", func() {
			So(w.Body, shouldContainInBody, "successful")
		})
	})
}
