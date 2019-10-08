package models

import (
	"log"

	"github.com/astaxie/beego/orm"
	"github.com/jinzhu/gorm"
)

type Organization struct {
	gorm.Model
	Name    string `json:"name"`
	Address string `json:"address"`
}

func init() {
	orm.RegisterModel(new(Organization))
}

// AddOrganization insert a new Organization into database and returns
// last inserted Id on success.
func AddOrganization(m *Organization) (id uint, err error) {
	err = DB.Create(m).Error
	id = m.ID
	return
}

// GetOrganizationById retrieves Organization by Id. Returns error if
// Id doesn't exist
func GetOrganizationById(id int64) (o *Organization, err error) {
	o = &Organization{}
	err = DB.Where("id = ?", id).First(o).Error
	if err != nil {
		return nil, err
	}
	return o, nil
}

// GetAllOrganization retrieves all Organization matches certain condition. Returns empty list if
// no records exist
func GetAllOrganization() ([]Organization, error) {
	orgs := []Organization{}
	err := DB.Find(orgs).Error
	if err != nil {
		log.Printf("Get all orgs error: %v\n", err)
		return nil, err
	}
	return orgs, nil
}

// UpdateOrganization updates Organization by Id and returns error if
// the record to be updated doesn't exist
func UpdateOrganizationById(m *Organization) (err error) {
	err = DB.Save(m).Error
	if err != nil {
		log.Printf("Update org error: %v\n", err)
		return err
	}
	return nil
}

// DeleteOrganization deletes Organization by Id and returns error if
// the record to be deleted doesn't exist
func DeleteOrganization(id uint) (err error) {
	o := &Organization{}
	o.ID = id
	return DB.Delete(o).Error
}
