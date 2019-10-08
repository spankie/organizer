package controllers

import (
	"github.com/astaxie/beego"
)

func SendJSONResponse(c *beego.Controller, data map[string]interface{}, status int) {
	c.Ctx.ResponseWriter.WriteHeader(status)
	c.Data["json"] = data
}
