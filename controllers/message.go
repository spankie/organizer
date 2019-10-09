package controllers

import (
	"github.com/astaxie/beego"
)

type RespData map[string]interface{}

func SendJSONResponse(c *beego.Controller, data RespData, status int) {
	c.Ctx.ResponseWriter.WriteHeader(status)
	c.Data["json"] = data
}
