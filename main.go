package main

import (
	"flag"
	"log"

	"github.com/spankie/organizer/controllers"
	"github.com/spankie/organizer/models"
	_ "github.com/spankie/organizer/routers"

	"github.com/astaxie/beego"
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

	beego.Router("/api/user", &controllers.UserController{})
	beego.Run()
}
