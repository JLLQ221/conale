import Menu from "@/Components/Menu";
import PrimaryButton from "@/Components/PrimaryButton";
import React from 'react'

const Inicio = ({ auth, formularios }) => {
  return (
    <Menu user={auth.user}>
      <div>
        <div className='pt-20 sm:pt-12'>
          <table className='border-collapse w-full table-auto  text-center'>
            <thead className="font-extrabold">
              <tr>
                <th className="pb-2">Folio</th>
                <th className="pb-2">Alumno</th>
                <th className="pb-2">Grupo</th>
                <th className="pb-2">Matricula</th>
                <th className="pb-2">Estado</th>
              </tr>
            </thead>
            <tbody className=" dark:text-gray-100 font-light">
              {formularios.map((formulario) => {
                return (
                  <tr onClick={(e)=>(console.log(formulario.folio))} key={formulario.folio} className="rounded-xl hover:bg-[#09310D]/10  dark:hover:bg-neutral-100/15  cursor-pointer border-b-2 shadow-sm">
                      <td>{formulario.folio}</td>
                      <td>{formulario.alumno}</td>
                      <td>{formulario.matricula}</td>
                      <td>{formulario.grupo}</td>
                      <td>{formulario.status}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Menu>
  )
}

export default Inicio