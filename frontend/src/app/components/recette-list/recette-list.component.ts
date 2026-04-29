import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecetteService } from '../../services/recette.service';

@Component({
  selector: 'app-recette-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './recette-list.component.html',
  styleUrls: ['./recette-list.component.css']
})
export class RecetteListComponent implements OnInit {
  recettes: any[] = [];
  categories: any[] = [];
  loading = true;
  error = '';

  // Filter state
  searchName = '';
  selectedCategory = '';
  selectedDifficulty = '';

  constructor(private recetteService: RecetteService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadRecettes();
  }

  loadCategories(): void {
    this.recetteService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadRecettes(): void {
    const filters = {
      name: this.searchName,
      category: this.selectedCategory,
      difficulty: this.selectedDifficulty
    };

    this.recetteService.getRecettesWithFilter(filters).subscribe(
      (data) => {
        this.recettes = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Erreur lors du chargement des recettes';
        this.loading = false;
        console.error(error);
      }
    );
  }

  onSearch(): void {
    this.loadRecettes();
  }

  onFilterChange(): void {
    this.loadRecettes();
  }

  resetFilters(): void {
    this.searchName = '';
    this.selectedCategory = '';
    this.selectedDifficulty = '';
    this.loadRecettes();
  }

  deleteRecette(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette recette?')) {
      this.recetteService.deleteRecette(id).subscribe(
        () => {
          this.loadRecettes();
        },
        (error) => {
          console.error(error);
          alert('Erreur lors de la suppression');
        }
      );
    }
  }
}
