import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'tree-view',
    template: ` 
              <div class="tree-item-child"  *ngFor="let node of treeData"> 
               <div class="tree-item">
                  <div class="tree-item-parents" *ngIf="node.children ==''" >
                        <div class="person" (click)="getNodeInfo(node)">
                             <img src="assets/img/0.jpg" alt="">
                             <p class="name">
                                 {{node.name}}
                             </p>
                         </div>
                   </div>
                   <div class="tree-item-parent" *ngIf="node.children !=''">
                        <div class="person" (click)="getNodeInfo(node)">
                        <img src="assets/img/0.jpg" alt="">                  
                             <p class="name">
                                 {{node.name}}
                             </p>
                         </div>
                   </div>          
                   <div class="tree-item-children">
                         <tree-view [treeData]="node.children" (checkEmitter)="getNodeInfo($event)"></tree-view>   
                   </div>        
               </div>   
             </div>
             <div bsModal #SetMasterModal="bs-modal" class="modal fade" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-success" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" (click)="SetMasterModal.hide()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">设置”“的主从关系</h4>
            </div>
            <div class="modal-body">



            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary"
                        >确定
                </button>
                <button type="button" class="btn btn-secondary" (click)="SetMasterModal.hide()">取消</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
`
})
export class testTree {

    @Input() treeData: Array<Object>;

    //声明事件发射器
    @Output() checkEmitter = new EventEmitter<any>();



    private getNodeInfo(node): void {
        //发射事件
        this.checkEmitter.emit(node);
    }

}
