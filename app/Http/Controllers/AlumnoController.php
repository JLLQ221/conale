<?php

namespace App\Http\Controllers;

use App\Models\Alumno;

class AlumnoController extends Controller
{
    //

    public function getAlumnos($matricula = '')
    {
        $alumnos = Alumno::take(4)->whereRaw("matricula like ?", ["%" . $matricula . '%'])->orderBy("matricula")->get();

        return response()->json($alumnos);
    }

}
