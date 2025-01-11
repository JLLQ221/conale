<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Crear roles 
        $role = Role::create(['name' => 'docente']);
        // Asignar rol a un usuario 
        $user = User::find(1);
        // Cambia el ID por el del usuario que deseas asignar el rol 
        $user->assignRole('docente');
    }
}
