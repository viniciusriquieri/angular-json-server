import { SharedService } from './../../shared/services/shared.service';
import { UsersService } from './users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.styl']
})
export class UsersComponent implements OnInit {

    private defaultThumb = "https://brejodocruz.pb.gov.br/wp-content/uploads/2021/01/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg";

    @ViewChild('search') searchElement!: ElementRef;


    public pageLimit = 10;
    public totalPages: number = 0;
    public pageCounter = 1;
    public showLoading = false;
    public filter = '';

    public listUsers: any = [];
    public listUsersTotal: any = [];
    public listRelatives: any = [];

    public tabsObj = {
        mainDataTab: true,
        relativesTab: false,
    };
    
    public selectedEmployee: any = null;

    public enrollModal = false;
    public deleteModal = false;

    thumbB64: any = this.defaultThumb;

    formSearch: FormGroup;
    formEmployee: FormGroup;
    formRelative: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UsersService,
        private shared: SharedService,
        private notification: NotificationsService
    ) { 
        this.formSearch = this.formBuilder.group({
            search: [''],
            filterType: ['name']
        });
        this.formEmployee = this.formBuilder.group({
            name: [''],
            email: [''],
            phone: [''],
            city: [''],
            gender: ['masculino'],
            department: [''],
        });
        this.formRelative = this.formBuilder.group({
            name: [''],
            kinship: ['']
        });
    }

    ngOnInit(): void {

        this.getEmployee(this.pageCounter, this.pageLimit);
        this.getEmployee();
    }  

    getEmployee = (page:any = '', limit:any ='', filter = '') => {
        this.showLoading = true;

        if(page!='') page = "?_page="+page;
        if(limit!='') page += "?_limit="+limit;

        this.userService.getEmployee(page, filter).subscribe(
            response => {
                if(page == ''){
                    if(filter == ''){
                        this.listUsersTotal = response;
                        this.totalPages = Math.ceil(this.listUsersTotal.length/this.pageLimit)
                    } else
                        this.listUsers = response;
                } else 
                    this.listUsers = response;
                
                this.showLoading = false;
            }
        );   
    }

    saveEmployee = (data: any) =>{

        if(data.name == "" || data.email == "" || data.department == "") {
            this.notification.warn("Atenção!","Insira os campos obrigatórios.")
            return;
        }

        const reqPayload = {
            thumb: this.thumbB64 == this.defaultThumb ? null : this.thumbB64 ,
            name: data.name.toUpperCase(),
            email: data.email.toUpperCase(),
            phone: data.phone.toUpperCase(),
            city: data.city.toUpperCase(),
            gender: data.gender,
            department: data.department,
            relatives: this.listRelatives
        };

        if(this.selectedEmployee == null){
            this.userService.postEmployee(reqPayload).subscribe(
                () => {
                    this.notification.success("Sucesso!","Funcionário cadastrado!");
                    this.getEmployee(this.pageCounter, this.pageLimit);
                    this.closeModal();
                },
                err => {
                    console.log(err);
                    this.notification.success("Erro!","Erro no servidor!");
                }
            );
        }
        else {
            this.userService.putEmployee(this.selectedEmployee.id, reqPayload).subscribe(
                () => {
                    this.notification.success("Sucesso!","Funcionário editado!");
                    this.getEmployee(this.pageCounter, this.pageLimit);
                    this.closeModal();
                },
                err => {
                    console.log(err);
                    this.notification.success("Erro!","Erro no servidor!");
                }
            );
        }
    }

    
    deleteEmployee = (id: number) =>{
        this.userService.deleteEmployee(id).subscribe(
            () => {
                this.notification.success("Sucesso!","Funcionário excluído!");
                this.getEmployee(this.pageCounter.toString(),'_limit='+this.pageLimit);
                this.closeModalDelete();
            },
            err => {
                console.log(err);
                this.notification.success("Erro!","Erro no servidor!");
            }
        );
    }


    filtering = (term: string) => {
        if(term.length <= 3) 
            return;

        this.filter = "?q="+term;

        console.log(this.filter)

        this.getEmployee('','',this.filter);
    }

    clearField = () => {
        this.formSearch.controls['search'].setValue('');
        this.filtering('name');
        this.searchElement.nativeElement.focus();
    }

    nextPage = () => {
        this.pageCounter++;
        this.getEmployee(this.pageCounter.toString(),'_limit='+this.pageLimit);
    }

    previousPage = () => {
        this.pageCounter--;
        this.getEmployee(this.pageCounter.toString(),'_limit='+this.pageLimit);
    }

    openModal = (row?: any) => {
        console.log(row)
        if(row != undefined){
            this.selectedEmployee = row;
            this.thumbB64 = row.thumb != null ? row.thumb : this.defaultThumb;
            this.formEmployee.controls['name'].setValue(this.selectedEmployee.name);
            this.formEmployee.controls['email'].setValue(this.selectedEmployee.email);
            this.formEmployee.controls['phone'].setValue(this.selectedEmployee.phone);
            this.formEmployee.controls['city'].setValue(this.selectedEmployee.city);
            this.formEmployee.controls['gender'].setValue(this.selectedEmployee.gender);
            this.formEmployee.controls['department'].setValue(this.selectedEmployee.department);
            
            this.listRelatives = this.selectedEmployee.relatives;
        }

        this.enrollModal = true;
    }

    closeModal  = () => {
        this.enrollModal = false;
        setTimeout(() => { 
            this.formEmployee = this.formBuilder.group({
                name: [''],
                email: [''],
                phone: [''],
                city: [''],
                gender: ['masculino'],
                department: [''],
            });
            this.formRelative = this.formBuilder.group({
                name: [''],
                kinship: ['']
            });
            this.thumbB64 = this.defaultThumb;
            this.listRelatives = [];
            this.selectedEmployee = null;
            this.selectTab(this.tabsObj, 'mainDataTab')
        }, 80);
    }

    openModalDelete = (row?: any) => {
        this.selectedEmployee = row;
        this.deleteModal = true;
    }
    
    closeModalDelete = () => {
        this.deleteModal = false;
    }

    selectTab = (tabObj: any, tabName: string) => {
        this.shared.tabChanger(tabObj, tabName);
    }

    addRelative = (data: any) => {
        for(let key in data){
            data[key] = data[key].toUpperCase();
        }
        this.listRelatives.push(data);
        
        this.formRelative = this.formBuilder.group({
            name: [''],
            kinship: ['']
        });
    }

    removeRelative = (index: number) => {
        this.listRelatives.splice(index,1);
    }

    handleFileInput = (files: any)=> {
		if (files.length === 0)
        return;
        
        var reader = new FileReader();
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
            this.thumbB64 = reader.result; 
        }
	}




}
