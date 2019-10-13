import {message} from "antd";

export function ShowErrors(err) {
  var data = err.response.data;
  console.log("data err: ", err.response);
  // console.log("err.response : ", err.response);
  if (data && data.error){
    message.error(data.error, 10);
  } else {
    const js = err.toJSON();
    // console.log(js);
    message.error(`${js.name} - ${js.message}`);
  }
}
