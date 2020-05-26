import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/classes/recipe';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit, OnDestroy {

  private subscriptons: Subscription[] = [];
  private recipe: Recipe;
  private instructions: FormArray;
  private ingredients: FormArray;
  public recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location,
    private fb: FormBuilder,
    private routr: Router
  ) { }

  ngOnInit(): void {
    this.subscriptons.push(
      this.route.paramMap.subscribe(params => {
        const recipeId = params.get('id');
        this.recipe = this.recipeService.getRecipeById(parseInt(recipeId));
        this.createForm();
      })
    )
  }

  private createForm(): void {

  }

  back() {
    this.back();
  }

  ngOnDestroy() {
    this.subscriptons.forEach(sub => sub.unsubscribe());
  }

}
