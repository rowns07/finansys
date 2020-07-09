import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];
  constructor(private caterogyService: CategoryService) { }


  ngOnInit(): void {
    this.caterogyService.getAll().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        console.log(categories);
      }

    );
  }


  delete(id: number) {
    confirm('Deseja deletar?');
    this.caterogyService.deleteCategory(id).subscribe(
    );

  }


}
