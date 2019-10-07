package models

func RunMigrations() {
	DB.AutoMigrate(&User{}, &Organization{})
}
