/**
 * Created by sy on 2017/3/20.
 */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


import {Defined} from '../defined';
@Component({
    templateUrl: 'test.html'
})
export class Test implements OnInit {

    public error: any;

    public module_tree: any;

    constructor() {

    }

    //初始化
    ngOnInit(): void {

        this.module_tree = [
            {
                "id": 1,
                "tag": "system",
                "name": "服务器1",
                "ui_show": true,
                "children": [
                    {
                        "id": 2,
                        "tag": "module",
                        "name": "服务器2",
                        "ui_show": true,
                        "children": []
                    },
                    {
                        "id": 3,
                        "tag": "function",
                        "name": "服务器3",
                        "ui_show": true,
                        "children": [
                            {
                                "id": 2,
                                "tag": "module",
                                "name": "服务器7",
                                "ui_show": true,
                                "children": []
                            },
                            {
                                "id": 3,
                                "tag": "function",
                                "name": "服务器8",
                                "ui_show": true,
                                "children": []
                            },
                            {
                                "id": 4,
                                "tag": "domain",
                                "name": "服务器9",
                                "ui_show": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "tag": "domain",
                        "name": "服务器4",
                        "ui_show": true,
                        "children": []
                    }, {
                        "id": 5,
                        "tag": "function",
                        "name": "服务器3",
                        "ui_show": true,
                        "children": [
                            {
                                "id": 2,
                                "tag": "module",
                                "name": "服务器10",
                                "ui_show": true,
                                "children": []
                            },
                            {
                                "id": 3,
                                "tag": "function",
                                "name": "服务器11",
                                "ui_show": true,
                                "children": []
                            },
                            {
                                "id": 4,
                                "tag": "domain",
                                "name": "服务器12",
                                "ui_show": true,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 6,
                        "tag": "domain",
                        "name": "服务器4",
                        "ui_show": true,
                        "children": []
                    },
                ]
            }

        ];
    }

    getNodeInfo(node): void {
        console.log(node);
    }
}
