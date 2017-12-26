<?php

namespace Admin\Controller;
use Think\Controller;
header('Access-Control-Allow-Origin:*');//允许所有来源访问
header('Access-Control-Allow-Method:POST,GET');//允许访问的方式
class LoginController extends Controller {

    public function login(){
        $admin = M("Admin");

        $name = trim(I("POST.name","","htmlspecialchars"));
        $pwd = trim(I("POST.pwd","","htmlspecialchars"));

        $adminName = $admin ->field("name") ->find();
        $adminPwd = $admin ->field("pwd") ->find();

        if( $adminName and $adminPwd ){
            if( $name === $adminName["name"] and $pwd === $adminPwd["pwd"] ){
                session("name",$name);
                $this ->success("登录成功！","/Admin/Index/index");
            }else{
                $this ->error("登录失败，用户名或密码错误！正在返回登录页面...");
            }
        }


//        if( $adminName and $adminPwd ){
//            if( $name === $adminName["name"] and $pwd === $adminPwd["pwd"] ){
//               $res = array(
//                   "status"=>1,
//                   "name"=> $name,
//                   "pwd"=>$pwd,
//                   "exday"=>1
//               );
//               echo json_encode($res);
//            }else{
//                $res = array(
//                    "status"=>0,
//                );
//                echo json_encode($res);
//            }
//        }
    }
}