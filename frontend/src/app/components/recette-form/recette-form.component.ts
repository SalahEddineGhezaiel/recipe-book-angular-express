import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecetteService } from '../../services/recette.service';

@Component({
  selector: 'app-recette-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recette-form.component.html',
  styleUrls: ['./recette-form.component.css']
})
export class RecetteFormComponent implements OnInit {
  recette = {
    name: '',
    description: '',
    difficulty: 'moyen',
    category: '',
    ingredients: ''
  };

  categories: any[] = [];
  recetteId: string | null = null;
  loading = false;
  error = '';
  submitted = false;

  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.recetteId = id;
        this.loadRecette(id);
      }
    });
  }

  loadCategories(): void {
    this.recetteService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error(error);
        this.error = 'Erreur lors du chargement des catégories';
      }
    );
  }

  loadRecette(id: string): void {
    this.recetteService.getRecetteById(id).subscribe(
      (data) => {
        this.recette = {
          name: data.name,
          description: data.description,
          difficulty: data.difficulty,
          category: data.category._id,
          ingredients: data.ingredients.join(', ')
        };
      },
      (error) => {
        console.error(error);
        this.error = 'Erreur lors du chargement de la recette';
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (!this.recette.name || !this.recette.description || !this.recette.category) {
      this.error = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    const ingredientsArray = this.recette.ingredients
      .split(',')
      .map((ing) => ing.trim())
      .filter((ing) => ing);

    const data = {
      name: this.recette.name,
      description: this.recette.description,
      difficulty: this.recette.difficulty,
      category: this.recette.category,
      ingredients: ingredientsArray
    };

    this.loading = true;

    if (this.recetteId) {
      this.recetteService.updateRecette(this.recetteId, data).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = 'Erreur lors de la mise à jour';
          this.loading = false;
          console.error(error);
        }
      );
    } else {
      this.recetteService.createRecette(data).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = 'Erreur lors de la création';
          this.loading = false;
          console.error(error);
        }
      );
    }
  }
}
