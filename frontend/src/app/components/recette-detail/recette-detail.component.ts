import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecetteService } from '../../services/recette.service';

@Component({
  selector: 'app-recette-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recette-detail.component.html',
  styleUrls: ['./recette-detail.component.css']
})
export class RecetteDetailComponent implements OnInit {
  recette: any = null;
  loading = true;
  error = '';

  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadRecette(id);
      }
    });
  }

  loadRecette(id: string): void {
    this.recetteService.getRecetteById(id).subscribe(
      (data) => {
        this.recette = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Recette non trouvée';
        this.loading = false;
        console.error(error);
      }
    );
  }
}
