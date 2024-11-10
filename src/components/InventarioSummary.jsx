import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inventarioService, areaService } from "@/services/dataService";

export const InventarioSummary = () => {
  const [selectedArea, setSelectedArea] = useState("todas");
  const [areas, setAreas] = useState([]);
  const [summary, setSummary] = useState({
    oleo: 0,
    graxa: 0
  });

  useEffect(() => {
    setAreas(areaService.getAll());
    updateSummary();
  }, [selectedArea]);

  const updateSummary = () => {
    const area = selectedArea === "todas" ? null : selectedArea;
    setSummary({
      oleo: inventarioService.getTotalByType("Óleo", area),
      graxa: inventarioService.getTotalByType("Graxa", area)
    });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-catYellow">
          Sumário do Inventário
        </h2>
        <Select value={selectedArea} onValueChange={setSelectedArea}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione a área" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as áreas</SelectItem>
            {areas.map((area) => (
              <SelectItem key={area.id} value={area.nome}>
                {area.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Quantidade Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Óleo</TableCell>
            <TableCell>{summary.oleo} L</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Graxa</TableCell>
            <TableCell>{summary.graxa} Kg</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default InventarioSummary;