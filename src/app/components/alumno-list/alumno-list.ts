import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno-list.html',
  styleUrls: ['./alumno-list.css']
})
export class AlumnoListComponent implements OnInit {
  alumnos: Alumno[] = [];

  constructor(
    private alumnoService: AlumnoService,
    private cdr: ChangeDetectorRef // <--- El despertador de Angular
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnoService.listar().subscribe({
      next: (data) => {
        this.alumnos = data;
        this.cdr.detectChanges(); // <--- OBLIGA a repintar el HTML al instante
      },
      error: (err) => console.error('Error al cargar la lista:', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar a este alumno?')) {
      this.alumnoService.eliminar(id).subscribe({
        next: () => this.cargarAlumnos(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }
}