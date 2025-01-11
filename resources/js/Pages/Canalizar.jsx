import { Head, useForm } from '@inertiajs/react';
import FormFloating from "@/Components/FormFloating";
import Menu from "@/Components/Menu";
import SelectFloating from '@/Components/SelectFloating';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaFloating from '@/Components/TextAreaFloating';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputAutocomplit from '@/Components/InputAutocomplit';
import axios from 'axios';


const Canalizar = ({ auth }) => {
  const [alumnosAll, setAlumnosAll] = useState([]);
  const { data, setData, post, processing, errors, reset } = useForm({
    fecha: new Date().toISOString().slice(0, 10),
    tutor: auth.user.name ?? '',
    alumno: '',
    matricula: '',
    turno: '',
    carrera: '',
    grupo: '',
    modulo: '',
    descripcion_problema: '',
    clasificacion_problematica: ''
  });

  const _getAlumnos = async (alumno) => { 
    if (alumno.trim() !== '') { 
      const response = await axios.get(route('alumnos.getAlumnos', [alumno])); 
      return response.data; 
    } 
    return []; 
  };

  const cambiarValores = async (e) => {
    const alumnoElegido = e.target.value;
    setData("matricula", alumnoElegido);
    let alumno = alumnosAll.find(item => parseInt(item.matricula) === parseInt(alumnoElegido)) ?? null;
    if (alumno == null) {
      const nuevosAlumnos = await _getAlumnos(alumnoElegido);
      setAlumnosAll(nuevosAlumnos);
    }
    mandarValores(alumno ?? "");
  };


  const mandarValores = (alumno) => {
    setData((prevData) => ({
      ...prevData,
      alumno: alumno.nombre ?? '',
      turno: alumno.turno ?? '',
      carrera: alumno.carrera ?? '',
      grupo: alumno.grupo ?? '',
    }));
  }

  const submit = (e) => {
    e.preventDefault();
    post(route('canalizar.post'), { onSuccess: () => reset() });
  };


  return (
    <Menu user={auth.user}>
      <Head title="Canalizar alumno" />
      <div className='pt-20 mb-4' >
        <form onSubmit={submit} >

          <FormFloating>
            <FormFloating.Input
              type='date'
              id='fecha'
              name="fecha"
              data-date-format="DD-MM-YYYY"
              value={data.fecha}
              onChange={(e) => setData('fecha', e.target.value)}
            />
            <FormFloating.Label htmlFor='fecha'>Fecha</FormFloating.Label>
            <InputError message={errors.fecha} className="pl-1 mt-2" />
          </FormFloating>

          <FormFloating>
            <FormFloating.Input
              type='text'
              id='tutor'
              name="tutor"
              disabled
              value={data.tutor}
            />
            <FormFloating.Label htmlFor='tutor'>Tutor</FormFloating.Label>
          </FormFloating>

          <InputAutocomplit>
            <InputAutocomplit.Input
              id='matricula'
              name='matricula'
              list='alumnoList'
              value={data.matricula}
              onChange={(e) => cambiarValores(e)}
            />

            <InputAutocomplit.Select id='alumnoList'>
              {
                alumnosAll.map(
                  (alumno) => {
                    return (
                      <option key={alumno.matricula} value={alumno.matricula}></option>
                    )
                  }
                )
              }
            </InputAutocomplit.Select>
            <InputAutocomplit.Label htmlFor='alumno'>Matricula de alumno</InputAutocomplit.Label>
          </InputAutocomplit>

          <FormFloating>
            <FormFloating.Input
              type='text'
              id='alumno'
              name="alumno"
              disabled
              value={data.alumno}
              readOnly={true}
            />
            <FormFloating.Label htmlFor='alumno'>Nombre</FormFloating.Label>
          </FormFloating>

          <FormFloating>
            <FormFloating.Input
              type='text'
              id='turno'
              name="turno"
              disabled
              value={data.turno}
              readOnly={true}
            />
            <FormFloating.Label htmlFor='turno'>Turno</FormFloating.Label>
          </FormFloating>

          <FormFloating>
            <FormFloating.Input
              type='text'
              id='carrera'
              name="carrera"
              disabled
              value={data.carrera}
              readOnly={true}
            />
            <FormFloating.Label htmlFor='carrera'>Carrera</FormFloating.Label>
          </FormFloating>

          <FormFloating>
            <FormFloating.Input
              type='text'
              id='grupo'
              name="grupo"
              disabled
              value={data.grupo}
              readOnly={true}
            />
            <FormFloating.Label htmlFor='grupo'>Grupo</FormFloating.Label>
          </FormFloating>


          <SelectFloating>
            <SelectFloating.Selected
              id='modulo'
              name="modulo"
              value={data.modulo}
              onChange={(e) => setData('modulo', e.target.value)}
            >
              <option defaultValue="">Selecciona el modulo</option>
              <option>Administración de los recursos de la oficina</option>
              <option>Administración de sistemas de interconexión de redes departamentales</option>
              <option>Administración de servicio</option>
              <option>Análisis derivativo de las funciones</option>
              <option>Aplicación de estándares de calidad</option>
              <option>Aplicación de técnicas de manejo en transporte ligero</option>
              <option>Captación y distribución de señales audiovisuales</option>
              <option>Certificación de sistemas de cableado estructurado</option>
            </SelectFloating.Selected>
            <SelectFloating.Label
              htmlFor='modulo'
            >
              Modulo
            </SelectFloating.Label>
          </SelectFloating>

          <TextAreaFloating>
            <TextAreaFloating.TextArea
              id="problematica"
              rows="4"
              value={data.descripcion_problema}
              onChange={(e) => setData('descripcion_problema', e.target.value)}
            >
            </TextAreaFloating.TextArea>
            <TextAreaFloating.Label
              htmlFor="problematica"
            >
              Descripción de la problematica
            </TextAreaFloating.Label>
            <InputError message={errors.descripcion_problema} className='mt-2 pl-1'></InputError>
          </TextAreaFloating>

          <SelectFloating>
            <SelectFloating.Selected
              id='clasificacionProblematica'
              name="clasificacionProblematica"
              value={data.clasificacion_problematica}
              onChange={(e) => setData('clasificacion_problematica', e.target.value)}
            >
              <option defaultValue="">Selecciona la categoria de la problematica</option>
              <option>Emocional</option>
              <option>Académico</option>
              <option>Conductual</option>
              <option>Económico</option>
            </SelectFloating.Selected>
            <SelectFloating.Label
              htmlFor='clasificacionProblematica'
            >
              Clasificación de la problematica
            </SelectFloating.Label>
          </SelectFloating>
       
          <PrimaryButton style={{ height: '50px', fontSize: '16px' }} className="my-2 w-full" disabled={processing}>
            Enviar
          </PrimaryButton>

        </form>
      </div>
    </Menu>
  )
}

export default Canalizar
