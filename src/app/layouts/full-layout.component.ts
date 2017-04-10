import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService}      from '../auth.service';
import {FullLayoutService} from './full-layout.service';
import {Lang} from '../lang';


@Component({

  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',

})
export class FullLayoutComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router, private route: ActivatedRoute, private service: FullLayoutService) {
  }

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};

  public sidebar: any;
  public default_lang = Lang.default_lang;
  public lang = Lang.langs;
  private error: any;


  public langdata = [{'id': 'zh_cn', 'name': '中文简体'}, {'id': 'en', 'name': 'English'}];
  //
  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  //初始化
  ngOnInit(): void {
    this.get_sidebar();
    //当页面初始化时，查看url里的语言类型，并设置为当前语言。
    if (this.router.url.indexOf('zh_cn') != -1) {
      this.default_lang = "zh_cn";
    } else {
      this.default_lang = "en";
    }
  }

  //获取左侧栏sidebar的值
  get_sidebar(): void {
    this.service.get_sidebar().subscribe(
      sidebar => {
        this.sidebar = sidebar.modules;
      },
      error => {
        let data = [
          {
            "id": 1,
            "tag": "system",
            "name": "系统参数",
            "ui_show": true,
            "children": [

              {
                "id": 3,
                "tag": "function",
                "name": "功能管理",
                "ui_show": true,
                "children": []
              },
              {
                "id": 4,
                "tag": "domain",
                "name": "域管理",
                "ui_show": true,
                "children": []
              }, {
                "id": 2,
                "tag": "language",
                "name": "语言管理",
                "ui_show": true,
                "children": []
              }, {
                "id": 12,
                "tag": "template_type",
                "name": "模版类型",
                "ui_show": true,
                "children": []
              },
            ]
          },
          {
            "id": 33,
            "tag": "device",
            "name": "设备管理",
            "ui_show": true,
            "children": [
              {
                "id": 6,
                "tag": "vendor",
                "name": "厂商管理",
                "ui_show": true,
                "children": []
              },
              {
                "id": 21,
                "tag": "type",
                "name": "设备类型",
                "ui_show": true,
                "children": []
              },
              {
                "id": 100,
                "tag": "chltype",
                "name": "通道类型",
                "ui_show": true,
                "children": []
              }
            ]
          },
          {
            "id": 5,
            "tag": "account",
            "name": "账号及权限",
            "ui_show": true,
            "children": [
              {
                "id": 7,
                "tag": "application",
                "name": "应用管理",
                "ui_show": true,
                "children": []
              },
              {
                "id": 8,
                "tag": "user",
                "name": "用户管理",
                "ui_show": true,
                "children": []
              },
              {
                "id": 9,
                "tag": "role",
                "name": "角色管理",
                "ui_show": true,
                "children": []
              },
            ]
          },
          {
            "id": 10,
            "tag": "server",
            "name": "服务器管理",
            "ui_show": true,
            "children": [
              {
                "id": 27,
                "tag": "machine",
                "name": "物理服务器",
                "ui_show": true,
                "children": []
              },
              {
                "id": 99,
                "tag": "test",
                "name": "test",
                "ui_show": true,
                "children": []
              }
            ]
          }
        ];
        this.sidebar = data;
        this.error = error
      }
    );
  }

  /*
   * changeLanguage
   * 设置语言类型
   * lang="zh_cn"为中文，lang="en"为英文
   */
  changeLanguage(lang) {

    if (this.default_lang == lang) {
      return false;
    }

    this.default_lang = lang;

    let href;

    //根据lang截取前面的href,跳转当前路由需要用到。
    if (this.router.url.indexOf("zh_cn") == -1) {
      href = this.getUrlStr(this.router.url, '/en')
    } else {
      href = this.getUrlStr(this.router.url, '/zh_cn')
    }
    //跳转到当前router,并传入设置的lang.
    this.router.navigate([href, lang], {relativeTo: this.route});
    //同步全局变量
    Lang.default_lang = lang;
  }

  //截取当前url，并返回。
  getUrlStr(str: any, lang: any): void {
    let str_before;
    if (lang == "/zh_cn") {
      str_before = str.split('/zh_cn')[0];
    } else {
      str_before = str.split('/en')[0];
    }

    return str_before;
  }

  //注销用户
  logout() {
    this.authService.isLoggedIn = false;
    //注销时清除本地sessionStorage值
    sessionStorage.clear();
  }
}
