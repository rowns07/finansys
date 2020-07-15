import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../shared/category.service';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private fB: FormBuilder,
    private categoriesService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.configForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }


  submitForm() {
    this.submittingForm = false;

    if (this.currentAction === 'new') {
      console.log('NEWWWW');
      this.createCategory();
    } else {
      console.log('EDITANDO');
      this.updateCategory();
    }

  }

  createCategory() {

    const categoria: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoriesService.create(categoria).subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    );
  }

  updateCategory() {
    const categoria: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoriesService.update(categoria).subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    );
  }

  actionsForSuccess(category: Category) {
    console.log('DEU BOM');

    // redirect/reload component page
    this.router.navigateByUrl('categories', { skipLocationChange: true }).then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    );
  }

  actionsForError(error) {
    console.log('ERRO AO PROCESSAR');
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação do servidor. Por favor tente mais tarde']
    }
  }

  setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editando categoria:' + categoryName;
    }
  }


  configForm() {
    this.categoryForm = this.fB.group(
      {
        id: [null],
        name: [null, [Validators.required, Validators.minLength(2)]],
        description: [null]
      }
    );
  }

  loadCategory() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoriesService.getById(+params.get('id')))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category);
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
      );
    }

  }
}
