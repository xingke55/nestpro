import { Controller, Get, Req, Res, Post, Body, Session } from '@nestjs/common';
import { AppService } from './app.service';
import * as svgCaptcha from 'svg-captcha';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/getVerifyPicture')
  getVerifyPicture(@Req() req, @Res() res, @Session() session) {
    console.log('getVerifyPicture');

    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 40, //高度
      background: '#cc9966', //背景颜色
    });
    console.log(session);

    session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('/login')
  login(@Req() req, @Body() body) {
    const { verfiyPicture } = body;
    console.log(req.session);
    const { code } = req.session;

    if (code.toLowerCase() === verfiyPicture.toLowerCase()) {
      return {
        code: 200,
        message: '登录成功',
      };
    } else {
      return {
        code: 500,
        message: '验证码错误，请重新输入验证码',
      };
    }
  }
}
