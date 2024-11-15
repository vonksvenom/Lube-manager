import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import OrdemServicoForm from "@/components/OrdemServicoForm";
import OrdemServicoTable from "@/components/OrdemServicoTable";
import { ordemServicoService, equipamentoService } from "@/services/dataService";
import BulkImportDialog from "@/components/common/BulkImportDialog";

const OrdensServico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ordensServico, setOrdensServico] = useState([]);
  const [selectedOrdem, setSelectedOrdem] = useState(null);
  const [equipamentos, setEquipamentos] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordensData, equipamentosData] = await Promise.all([
          ordemServicoService.getAll(),
          equipamentoService.getAll()
        ]);
        setOrdensServico(ordensData);
        setEquipamentos(equipamentosData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Houve um problema ao carregar os dados. Usando dados locais.",
          variant: "destructive",
        });
      }
    };
    
    loadData();
  }, [toast]);

  const handleDelete = (id) => {
    ordemServicoService.delete(id);
    setOrdensServico(ordemServicoService.getAll());
    toast({
      title: "Ordem de serviço excluída",
      description: "A ordem de serviço foi removida com sucesso.",
    });
  };

  const handleSave = (data) => {
    if (selectedOrdem) {
      ordemServicoService.update(selectedOrdem.id, data);
      toast({
        title: "Ordem de serviço atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
    } else {
      ordemServicoService.add(data);
      toast({
        title: "Ordem de serviço criada",
        description: "A nova ordem de serviço foi cadastrada com sucesso.",
      });
    }
    setOrdensServico(ordemServicoService.getAll());
    setSelectedOrdem(null);
    setDialogOpen(false);
  };

  const handleEdit = (ordem) => {
    setSelectedOrdem(ordem);
    setDialogOpen(true);
  };

  const handleImport = (data) => {
    data.forEach(item => {
      ordemServicoService.add(item);
    });
    setOrdensServico(ordemServicoService.getAll());
  };

  const templateData = [
    {
      titulo: "Exemplo Ordem 1",
      descricao: "Descrição da ordem",
      tipo: "Preventiva",
      equipamentoId: "1",
      status: "Pendente",
      dataInicio: "2024-03-20",
      dataFim: "2024-03-21",
      prioridade: "Media"
    }
  ];

  const filteredOrdensServico = ordensServico.filter(
    (ordem) =>
      ordem.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ordem.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("workOrders")}</h1>
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => setSelectedOrdem(null)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nova Ordem de Serviço
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedOrdem
                    ? "Editar Ordem de Serviço"
                    : "Nova Ordem de Serviço"}
                </DialogTitle>
              </DialogHeader>
              <OrdemServicoForm
                initialData={selectedOrdem}
                onSave={handleSave}
                equipamentos={equipamentos}
              />
            </DialogContent>
          </Dialog>
          <BulkImportDialog
            title="Importar Ordens de Serviço"
            onImport={handleImport}
            templateData={templateData}
            templateFilename="template_ordens_servico.xlsx"
          />
        </div>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar ordens de serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <OrdemServicoTable
          ordensServico={filteredOrdensServico}
          onEdit={handleEdit}
          onDelete={handleDelete}
          equipamentos={equipamentos}
        />
      </Card>
    </div>
  );
};

export default OrdensServico;