        // --- Variáveis de Estado Global (Simulando um estado de aplicação) ---
        let transactions = [];
        let filter = '';
        let isModalOpen = false;
        let editingTransaction = null;
        let deleteModalOpen = false;
        let transactionToDelete = null;
        let modalCurrentType = 'expense'; // Controla o tipo dentro do modal antes do submit

        // --- Constantes ---
        // URL da imagem de logo. Como o ambiente de execução não suporta caminhos de arquivo locais,
        // este é um placeholder com o nome do arquivo que você forneceu.
        const LOGO_URL = "uploaded:logo seriemas.png-f7fb4657-a304-4040-9d56-bc45f16e679c";
        
        const CATEGORIES = [
            'Material de Escritório', 'Alimentação', 'Transporte', 
            'Limpeza', 'Manutenção', 'Reposição de Caixa', 'Outros'
        ];

        // --- Funções de Ajuda (Ícones SVG e Formatação) ---

        // Função para obter ícones SVG inline
        const getIcon = (name, classes = "w-6 h-6") => {
            const icons = {
                Wallet: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M21 12V7H5a2 2 0 0 1 0-4h16"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12h-2"/><path d="M10 12V7"/></svg>`,
                TrendingUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><polyline points="22 7 13.5 15.5 10.14 12.14 4 18"/><polyline points="16 7 22 7 22 13"/></svg>`,
                TrendingDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><polyline points="22 17 13.5 8.5 10.14 11.86 4 6"/><polyline points="16 17 22 17 22 11"/></svg>`,
                Plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
                Trash2: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
                Search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
                PieChart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`,
                ArrowUpCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/></svg>`,
                ArrowDownCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><circle cx="12" cy="12" r="10"/><path d="m8 12 4 4 4-4"/><path d="M12 8v8"/></svg>`,
                X: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
                Pencil: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
                AlertTriangle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14a2 2 0 0 0 1.74 3H19.9a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
                Building2: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M6 15v3c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-3"/><path d="M18 8v7"/><path d="M14 12V8"/><path d="M10 16v-4"/><path d="M6 18v-7c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v7"/><path d="M10 8h4"/><path d="M2 22h20"/><path d="M3 7l9-4 9 4"/></svg>`
            };
            return icons[name] || '';
        };

        const formatMoney = (value) => {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            // Formato: DD/MM HH:MM
            return new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        };

        // --- Persistência (localStorage) ---
        // Usa o localStorage para salvar os dados no navegador do usuário.

        const loadState = () => {
            const saved = localStorage.getItem('pettyCashData');
            if (saved) {
                transactions = JSON.parse(saved);
            } else {
                // Dados iniciais de exemplo se não houver nada salvo
                transactions = [
                    { id: 1, description: 'Fundo Inicial', amount: 500.00, type: 'income', category: 'Reposição de Caixa', date: new Date().toISOString() },
                    { id: 2, description: 'Cartuchos de Impressora', amount: 120.50, type: 'expense', category: 'Material de Escritório', date: new Date().toISOString() },
                ];
            }
        };

        const saveState = () => {
            localStorage.setItem('pettyCashData', JSON.stringify(transactions));
            render(); // Re-renderiza após salvar o estado
        };

        // --- Funções de Manipulação de Dados (CRUD) ---

        const handleSaveTransaction = (description, amount, type, category, isEditing) => {
            const transactionData = {
                description,
                amount: parseFloat(amount),
                type,
                category,
                // Mantém a data original na edição ou usa a data atual para novos
                date: isEditing ? editingTransaction.date : new Date().toISOString(), 
            };

            if (isEditing) {
                // Atualizar transação existente
                transactions = transactions.map(t => 
                    t.id === editingTransaction.id ? { ...t, ...transactionData, id: editingTransaction.id } : t
                );
            } else {
                // Criar nova transação com um ID baseado no timestamp
                const newId = Date.now();
                // Adiciona o novo item no início da lista para aparecer primeiro
                transactions = [{ ...transactionData, id: newId }, ...transactions];
            }
            closeModal();
            saveState();
        };

        const executeDelete = () => {
            if (transactionToDelete) {
                transactions = transactions.filter(t => t.id !== transactionToDelete);
            }
            setDeleteModalOpen(false);
            saveState();
        };

        // --- Gerenciamento de Modais ---

        const openNewTransactionModal = () => {
            editingTransaction = null;
            modalCurrentType = 'expense';
            isModalOpen = true;
            render();
        };

        const openEditModal = (id) => {
            editingTransaction = transactions.find(t => t.id === id);
            if (editingTransaction) {
                modalCurrentType = editingTransaction.type;
            }
            isModalOpen = true;
            render();
        };

        const closeModal = () => {
            isModalOpen = false;
            editingTransaction = null;
            render();
        };
        
        const confirmDelete = (id) => {
            transactionToDelete = id;
            setDeleteModalOpen(true);
        };

        const setDeleteModalOpen = (open) => {
            deleteModalOpen = open;
            transactionToDelete = open ? transactionToDelete : null;
            render();
        };

        // --- Funções de Renderização Parcial (HTML Templates) ---

        // Renderiza um Card de Resumo (Saldo, Receita, Despesa)
        const renderStatCard = (title, value, type, iconName) => {
            let colors = '';
            let subtextColor = '';
            
            // Define as cores com base no tipo para um design atraente
            if (type === 'balance') {
                colors = 'bg-orange-600 text-white';
                subtextColor = 'text-orange-100';
            } else if (type === 'income') {
                colors = 'bg-orange-500 text-white';
                subtextColor = 'text-orange-100';
            } else if (type === 'expense') {
                colors = 'bg-gray-700 text-white';
                subtextColor = 'text-gray-300';
            } else {
                colors = 'bg-white text-gray-800 border';
                subtextColor = 'text-gray-500';
            }

            return `
                <div class="p-6 rounded-2xl shadow-lg flex items-center justify-between ${colors}">
                    <div>
                        <p class="text-sm font-medium ${subtextColor}">${title}</p>
                        <h3 class="text-2xl font-bold mt-1">${value}</h3>
                    </div>
                    <div class="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                        ${getIcon(iconName, 'w-6 h-6')}
                    </div>
                </div>
            `;
        };

        // Renderiza o cabeçalho fixo
        const renderHeader = () => {
            return `
                <header class="bg-white shadow-md border-b sticky top-0 z-10">
                    <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                        
                        <!-- Logo / Nome da Empresa -->
                        <div class="flex items-center gap-4">
                            <div class="bg-white h-12 w-16 flex items-center justify-center overflow-hidden relative">
                               <!-- Imagem do logo com tratamento de erro caso não carregue -->
                               <img 
                                 id="seriemas-logo"
                                 src="${LOGO_URL}" 
                                 alt="Logo Consórcio Seriemas" 
                                 class="h-full w-full object-contain"
                                 onerror="document.getElementById('seriemas-logo').style.display='none'; document.getElementById('logo-fallback').classList.remove('hidden');"
                               />
                               <!-- Fallback simples se a imagem falhar -->
                               <div id="logo-fallback" class="absolute inset-0 flex items-center justify-center hidden">
                                   ${getIcon('Building2', 'text-gray-400 w-6 h-6')}
                               </div>
                            </div>

                            <div class="flex flex-col">
                                <h1 class="text-xl font-black text-gray-900 leading-tight tracking-tight">CONSÓRCIO SERIEMAS</h1>
                                <span class="text-xs font-semibold text-gray-500 tracking-wider">GEL | COSAMPA | CBC</span>
                            </div>
                        </div>

                        <!-- Botão de Nova Transação -->
                        <button 
                            onclick="openNewTransactionModal()"
                            class="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
                        >
                            ${getIcon('Plus', 'w-5 h-5')}
                            <span class="hidden sm:inline">Nova Transação</span>
                            <span class="sm:hidden">Novo</span>
                        </button>
                    </div>
                </header>
            `;
        };

        // Renderiza o Modal de Adicionar/Editar Transação
        const renderTransactionModal = () => {
            if (!isModalOpen) return '';

            const data = editingTransaction;
            const isEditing = !!data;

            const defaultDescription = data ? data.description : '';
            const defaultAmount = data ? data.amount : '';
            const type = data ? data.type : modalCurrentType;
            const defaultCategory = data ? data.category : (type === 'income' ? 'Reposição de Caixa' : 'Outros');

            const categoryOptions = CATEGORIES.map(cat => 
                `<option value="${cat}" ${cat === defaultCategory ? 'selected' : ''}>${cat}</option>`
            ).join('');

            return `
                <div id="transactionModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                        <div class="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                            <h2 class="text-lg font-bold text-gray-800">
                                ${isEditing ? 'Editar Movimentação' : 'Nova Movimentação'}
                            </h2>
                            <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600 transition-colors">
                                ${getIcon('X', 'w-5 h-5')}
                            </button>
                        </div>
                        
                        <form onsubmit="handleModalSubmit(event)" data-current-type="${type}" class="p-6 space-y-4">
                            
                            <!-- Botões de Tipo de Transação (Entrada/Saída) -->
                            <div class="grid grid-cols-2 gap-3" id="modalTypeButtons">
                                <button
                                    type="button"
                                    onclick="setModalType('income')"
                                    class="flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                                        type === 'income' 
                                          ? 'bg-orange-100 text-orange-700 border-2 border-orange-500' 
                                          : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'
                                    }"
                                >
                                    ${getIcon('ArrowUpCircle', 'w-4 h-4')}
                                    Entrada
                                </button>
                                <button
                                    type="button"
                                    onclick="setModalType('expense')"
                                    class="flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                                        type === 'expense' 
                                          ? 'bg-gray-200 text-gray-800 border-2 border-gray-400' 
                                          : 'bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200'
                                    }"
                                >
                                    ${getIcon('ArrowDownCircle', 'w-4 h-4')}
                                    Saída
                                </button>
                            </div>

                            <!-- Campo Valor -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                                <input
                                    id="modalAmount"
                                    type="number"
                                    step="0.01"
                                    required
                                    value="${defaultAmount}"
                                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg font-semibold"
                                    placeholder="0,00"
                                />
                            </div>

                            <!-- Campo Descrição -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <input
                                    id="modalDescription"
                                    type="text"
                                    required
                                    value="${defaultDescription}"
                                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                    placeholder="Ex: Compra de café"
                                />
                            </div>

                            <!-- Campo Categoria -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                                <select
                                    id="modalCategory"
                                    class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
                                >
                                    ${categoryOptions}
                                </select>
                            </div>

                            <!-- Botão de Ação (Salvar/Adicionar) -->
                            <button
                                type="submit"
                                class="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all mt-4"
                            >
                                ${isEditing ? 'Salvar Alterações' : 'Adicionar Movimentação'}
                            </button>
                        </form>
                    </div>
                </div>
            `;
        };

        // Renderiza o Modal de Confirmação de Exclusão
        const renderConfirmModal = () => {
            if (!deleteModalOpen) return '';

            return `
                <div id="confirmModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
                    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-fade-in-up">
                        <div class="flex items-center gap-3 text-orange-600 mb-4">
                            ${getIcon('AlertTriangle', 'w-7 h-7')}
                            <h3 class="text-lg font-bold text-gray-800">Confirmar Exclusão</h3>
                        </div>
                        <p class="text-gray-600 mb-6 leading-relaxed">Tem certeza que deseja remover este item permanentemente? Esta ação não pode ser desfeita.</p>
                        <div class="flex justify-end gap-3">
                            <button 
                                onclick="setDeleteModalOpen(false)" 
                                class="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onclick="executeDelete()" 
                                class="px-5 py-2.5 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 shadow-md hover:shadow-lg transition-all"
                            >
                                Confirmar Exclusão
                            </button>
                        </div>
                    </div>
                </div>
            `;
        };

        // Renderiza o Conteúdo Principal (Cards de Resumo e Tabela)
        const renderMainContent = () => {
            // Cálculos de Resumo
            const totalBalance = transactions.reduce((acc, curr) => 
                curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);

            const totalIncome = transactions
                .filter(t => t.type === 'income')
                .reduce((acc, curr) => acc + curr.amount, 0);

            const totalExpense = transactions
                .filter(t => t.type === 'expense')
                .reduce((acc, curr) => acc + curr.amount, 0);

            // Filtra as transações com base na entrada de busca
            const filtered = transactions.filter(t => 
                t.description.toLowerCase().includes(filter.toLowerCase()) ||
                t.category.toLowerCase().includes(filter.toLowerCase())
            );

            let tableRows = '';
            if (filtered.length > 0) {
                // Gera a tabela de transações
                tableRows = `
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50 text-gray-500 text-sm font-semibold border-b border-gray-100">
                                <th class="px-6 py-4">Descrição</th>
                                <th class="px-6 py-4 hidden sm:table-cell">Categoria</th>
                                <th class="px-6 py-4 hidden md:table-cell">Data</th>
                                <th class="px-6 py-4 text-right">Valor</th>
                                <th class="px-6 py-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${filtered.map(t => `
                                <tr class="hover:bg-gray-50 transition-colors group">
                                    <td class="px-6 py-4">
                                        <div class="font-medium text-gray-800">${t.description}</div>
                                        <div class="text-xs text-gray-400 sm:hidden">${t.category} • ${formatDate(t.date).split(' ')[0]}</div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                                        <span class="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">
                                            ${t.category}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                                        ${formatDate(t.date)}
                                    </td>
                                    <td class="px-6 py-4 text-right font-bold whitespace-nowrap ${t.type === 'income' ? 'text-orange-600' : 'text-gray-700'}">
                                        ${t.type === 'income' ? '+' : '-'} ${formatMoney(t.amount)}
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <div class="flex items-center justify-center gap-2">
                                            <button 
                                                onclick="openEditModal(${t.id})"
                                                class="text-gray-400 hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-orange-50"
                                                title="Editar"
                                            >
                                                ${getIcon('Pencil', 'w-4 h-4')}
                                            </button>
                                            <button 
                                                onclick="confirmDelete(${t.id})"
                                                class="text-gray-400 hover:text-gray-800 transition-colors p-2 rounded-full hover:bg-gray-200"
                                                title="Remover"
                                            >
                                                ${getIcon('Trash2', 'w-4 h-4')}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            } else {
                // Mensagem de "não encontrado"
                tableRows = `
                    <div class="p-10 text-center text-gray-400">
                        <div class="bg-gray-50 inline-block p-4 rounded-full mb-3">
                            ${getIcon('Search', 'w-8 h-8')}
                        </div>
                        <p>Nenhuma movimentação encontrada com o filtro atual.</p>
                        <p class="text-xs mt-1">Tente uma busca diferente ou adicione uma nova transação.</p>
                    </div>
                `;
            }

            return `
                <main class="max-w-5xl mx-auto px-4 py-8 space-y-8">
                    
                    <!-- Título da Página / Seção -->
                    <div class="flex items-center gap-2 text-gray-700 mb-2">
                        ${getIcon('Wallet', 'text-orange-600 w-6 h-6')}
                        <h2 class="text-2xl font-bold">Controle de Caixa Rotativo</h2>
                    </div>

                    <!-- Cards de Resumo -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        ${renderStatCard("Saldo Atual", formatMoney(totalBalance), "balance", "Wallet")}
                        ${renderStatCard("Total Entradas", formatMoney(totalIncome), "income", "TrendingUp")}
                        ${renderStatCard("Total Saídas", formatMoney(totalExpense), "expense", "TrendingDown")}
                    </div>

                    <!-- Área Principal: Lista e Filtros -->
                    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <h2 class="text-lg font-bold text-gray-700 flex items-center gap-2">
                                ${getIcon('PieChart', 'text-gray-400 w-5 h-5')}
                                Histórico de Movimentações
                            </h2>
                            
                            <!-- Campo de Busca/Filtro -->
                            <div class="relative w-full sm:w-64">
                                ${getIcon('Search', 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4')}
                                <input 
                                    id="filterInput"
                                    type="text" 
                                    placeholder="Buscar descrição ou categoria..." 
                                    value="${filter}"
                                    oninput="setFilter(this.value)"
                                    class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition-all"
                                />
                            </div>
                        </div>

                        <!-- Tabela de Transações -->
                        <div class="overflow-x-auto" id="transactionsTable">
                            ${tableRows}
                        </div>
                    </div>
                    
                    <!-- Rodapé Informativo -->
                    <div class="text-center text-sm text-gray-400 mt-8">
                        <p>Seus dados são salvos automaticamente no navegador (LocalStorage).</p>
                    </div>

                </main>
            `;
        };

        // --- Funções de Manipulação da UI e Eventos ---

        // Função principal que redesenha o aplicativo (como um framework reativo simples)
        const render = () => {
            const appDiv = document.getElementById('app');
            if (!appDiv) return;

            // Renderiza o esqueleto principal e os modais
            appDiv.innerHTML = `
                <div class="min-h-screen bg-gray-100 text-gray-800 font-sans pb-20">
                    ${renderHeader()}
                    ${renderMainContent()}
                    ${renderTransactionModal()}
                    ${renderConfirmModal()}
                </div>
            `;
            
            // Re-define o valor do campo de filtro
            const filterInput = document.getElementById('filterInput');
            if (filterInput) filterInput.value = filter;

            // Se o modal estiver aberto, ajusta o estado dos botões de tipo
            if (isModalOpen) {
                 setModalType(modalCurrentType, false); 
            }
        };

        // Função para atualizar o filtro e re-renderizar
        const setFilter = (value) => {
            filter = value;
            render(); 
        };

        // Função para manipular a mudança de tipo no modal, atualizando a UI e o estado (sem re-render total)
        const setModalType = (type, updateCategory = true) => {
            modalCurrentType = type;
            
            const form = document.querySelector('#transactionModal form');
            const incomeButton = document.querySelector('#modalTypeButtons button[onclick="setModalType(\'income\')"]');
            const expenseButton = document.querySelector('#modalTypeButtons button[onclick="setModalType(\'expense\')"]');
            const categorySelect = document.getElementById('modalCategory');

            if (form) form.dataset.currentType = type;

            if (incomeButton && expenseButton) {
                // Aplica classes de estilo dinamicamente
                if (type === 'income') {
                    incomeButton.className = 'flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all bg-orange-100 text-orange-700 border-2 border-orange-500';
                    expenseButton.className = 'flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200';
                    
                    // Ajusta a categoria padrão ao mudar o tipo, se não estiver editando
                    if (updateCategory && !editingTransaction && categorySelect) categorySelect.value = 'Reposição de Caixa';
                } else {
                    incomeButton.className = 'flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all bg-gray-100 text-gray-500 border-2 border-transparent hover:bg-gray-200';
                    expenseButton.className = 'flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all bg-gray-200 text-gray-800 border-2 border-gray-400';
                    
                    if (updateCategory && !editingTransaction && categorySelect) categorySelect.value = 'Outros';
                }
            }
        };


        // Lida com o envio do formulário do modal
        const handleModalSubmit = (event) => {
            event.preventDefault();
            
            const form = event.target;
            const description = document.getElementById('modalDescription').value;
            const amount = document.getElementById('modalAmount').value;
            // Pega o tipo do atributo data-current-type do formulário
            const type = form.dataset.currentType; 
            const category = document.getElementById('modalCategory').value;
            
            if (!description || !amount) return;

            // Define se é uma edição
            const isEditing = !!editingTransaction;

            handleSaveTransaction(description, amount, type, category, isEditing);
        };

        // --- Inicialização ---

        window.onload = () => {
            loadState();
            render();
        };
