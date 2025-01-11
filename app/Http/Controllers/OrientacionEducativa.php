<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Models\FormularioCanalizacion;

class OrientacionEducativa extends Controller
{
    

    public function index() {
        $formularios = FormularioCanalizacion::where('clasificacion_problematica', 'Emocional: orientacion educativa')->get();
        return  Inertia::render('Orientacion_Educativa/Inicio', ['formularios' => $formularios]);
    }
}

