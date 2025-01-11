<?php

use App\Http\Controllers\AlumnoController;
use App\Http\Controllers\FormularioCanalizacionController;
use App\Http\Controllers\OrientacionEducativa;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\EnsureUserHasRole;


Route::get('/', function () {
    return Inertia::render('Auth/Login');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';


Route::middleware('role:docente')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    // Métodos de formulario de canalización
    Route::name('canalizar.')->group(function () {
        Route::get(
            '/canalizar',
            [FormularioCanalizacionController::class, 'create']
        )->name('canalizar');

        Route::post(
            '/post',
            [FormularioCanalizacionController::class, 'store']
        )
            // Route assigned name "canalizar.mandarDatos"
            ->name('post');
    });

    // Método para obtener a los alumnos dependiendo de su matricula
    Route::name('alumnos.')->group(function (): void {
        Route::get(
            '/getAlumnos/{matricula}',
            [AlumnoController::class, 'getAlumnos']
        )->name('getAlumnos');
    });
});


Route::prefix('orientacion-educativa')->group(function()
{
    Route::get('/inicio',
        [OrientacionEducativa::class, 'index']
    )->name('orientacion.inicio')->middleware('role:orientacion-educativa');
});

