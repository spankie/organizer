package main

import (
	"flag"
	"log"

	"github.com/spankie/organizer/controllers"
	"github.com/spankie/organizer/models"
	_ "github.com/spankie/organizer/routers"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/plugins/cors"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func main() {
	migrate := flag.Bool("migrate", false, "Indicate if migrations should be run.")
	flag.Parse()
	db, err := models.GetDB()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	if *migrate {
		log.Println("Migrations run already...")
		models.RunMigrations()
		return
	}

	if beego.BConfig.RunMode == "dev" {
		beego.BConfig.WebConfig.DirectoryIndex = true
		beego.BConfig.WebConfig.StaticDir["/swagger"] = "swagger"
	}
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"Origin", "Authorization", "content-type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	beego.Router("/user", &controllers.UserController{})
	beego.Run()
}
