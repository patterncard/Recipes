import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe.spec';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.css']
})

export class ShowRecipeComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  private recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private loction: Location
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.route.paramMap.subscribe(params => {
        const recipeId = params.get('id');
        this.recipe = this.recipeService.getRecipeById(parseInt(recipeId));
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  back() {
    this.location.back();
  }

  deleterecipe(): void {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['']);
  }

}
