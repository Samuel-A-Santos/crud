import { useState } from "react";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkBox";
import { Input } from "../components/input";
import { Switch } from "../components/switch";
import { DoubleCheck } from "../components/doubleCheck";
import { DropDown } from "../components/dropDown";
import { Toast } from "../components/toast";
// import { EmployeeList } from "../components/employeeList";
// import { useEmployees } from "../hooks/useEmployee";

export const Home = () => {
  const [checked, setChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [gender, setGender] = useState<'feminino' | 'masculino' | null>(null);
  interface EPI {
    id: number;
    name: string;
  }

  const [selectedEPI, setSelectedEPI] = useState<EPI | null>(null);

  const epis: EPI[] = [
    { id: 1, name: 'Calçado de segurança' },
    { id: 2, name: 'Capacete' },
    { id: 3, name: 'Luvas' },
  ];
  

  const [showToast, setShowToast] = useState(false);

  const handleDeleteUser = () => {
    setShowToast(true);
  };

  // const { employees, updateEmployee, deleteEmployee } = useEmployees();

  // const handleEdit = (id: string) => {
  //   console.log('Edit employee:', id);
  // };

  // const handleDelete = (id: string) => {
  //   deleteEmployee(id);
  // };

  return (
    <div
      style={{
        padding: "20px",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Hello World</h1>
      <Input label="samuel" />
      <div>
        <Button onClick={() => alert("Clicked!")}>Click Me</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div>
        <Checkbox
          checked={checked}
          onCheckedChange={(val) => setChecked(Boolean(val))}
          label="Accept terms"
          id="terms"
        />
      </div>
      <Switch
        checked={switchChecked}
        onCheckedChange={(value) => setSwitchChecked(value)}
        disabled={false}
      />
      <DoubleCheck value={gender} onChange={setGender} />
      <DropDown
        options={epis}
        value={selectedEPI}
        onChange={setSelectedEPI}
        renderOption={(epi) => epi.name}
        label="Selecione o EPI:"
      />
      <Button onClick={handleDeleteUser}>Deletar Usuário</Button>

      <Toast
        message="Usuário excluído com sucesso!"
        isOpen={showToast}
        onClose={() => setShowToast(false)}
      />

      <h1>Funcionários</h1>
      {/* <EmployeeList 
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}
    </div>
  );
};
