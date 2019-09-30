package main

import (
	"github.com/spankie/organizer/controllers"
	_ "github.com/spankie/organizer/routers"

	"github.com/astaxie/beego"
)

func main() {
	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}
	beego.Router("/user", &controllers.UserController{})
	beego.Run()
}
