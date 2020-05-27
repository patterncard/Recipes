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
    private router: Router
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
    this.recipeForm = this.fb.group({
      title: [this.recipe.title, [Validators.required]],
      description: [this.recipe.description, [Validators.required]],
      serves: [this.recipe.description, [Validators.required]],
      imageUrl: [this.recipe.description, [Validators.required]],
      instructions: this.fb.array([]),
      ingredients: this.fb.array([])

    });

    this.instructions = this.recipeForm.get('instructions') as FormArray;
    this.ingredients = this.recipeForm.get('ingrediants') as FormArray;

    this.recipe.instructions.forEach(instruction => {
      this.instructions.push(this.createInstruction(instruction));
    });

    this.recipe.ingredients.forEach(ingredient => {
      this.ingredients.push(this.createIngredient(ingredient.amount, ingredient.name));
    });
  }

  private createInstruction(step: string): FormGroup {
    return this.fb.group({
      step: [step, [Validators.required]]
    });
  }

  private createIngredient(amount: string, name: string): FormGroup {
    return this.fb.group({
      amount: [amount, [Validators.required]],
      name: [name, [Validators.required]]
    });
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscriptons.forEach(sub => sub.unsubscribe());
  }

}
