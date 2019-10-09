package models

import (
	"github.com/astaxie/beego"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var DB *gorm.DB

func GetDB() (*gorm.DB, error) {
	var err error
	DB, err = gorm.Open("mysql", beego.AppConfig.String("mysql"))
	if err != nil {
		return nil, err
	}
	return DB, nil
}
