import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/classes/recipe';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit, OnDestroy {

  private subscriptons: Subscription[] = [];
  public recipe: Recipe;
  public instructions: FormArray;
  public ingredients: FormArray;
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
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      serves: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      instructions: this.fb.array([]),
      ingredients: this.fb.array([])

    });

    this.instructions = this.recipeForm.get('instructions') as FormArray;
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;

    this.addInstruction();
    this.addIngredient();
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

  addInstruction(): void {
    this.instructions.push(this.createInstruction(''));
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient('', ''));
  }

  deleteInstruction(index: number): void {
    const arrayControl = this.recipeForm.controls['instructions'] as FormArray;
    arrayControl.removeAt(index);
  }

  deleteIngredient(index: number): void {
    const arrayControl = this.recipeForm.controls['ingredients'] as FormArray;
    arrayControl.removeAt(index);
  }

  submitForm(): void {
    if (this.recipeForm.valid) {
      const { title, description, serves, imageUrl, ingredients, instructions } = this.recipeForm.value;
      const filteredInstructions = instructions.map(item => item.step);
      this.recipeService.createRecipe(
        title,
        description,
        serves,
        imageUrl,
        ingredients,
        filteredInstructions
      );

      this.router.navigate(['']);
    } else {
      // else show alert
      console.log("Form Error");
    }
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscriptons.forEach(sub => sub.unsubscribe());
  }

}

