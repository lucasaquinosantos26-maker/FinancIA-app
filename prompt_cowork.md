# 🤖 PROMPT ESTRUTURADO PARA CLAUDE COWORK
## Automação Completa de Melhorias FinancIA

---

## 📌 CONTEXTO DO PROJETO

**Projeto:** FinancIA - App de Gestão Financeira com IA  
**Repositório:** https://github.com/lucasaquinosantos26-maker/FinancIA-app  
**Link ao Vivo:** https://unique-queijadas-b2e0be.netlify.app  
**Stack:** HTML + CSS + JavaScript Vanilla + Netlify Functions  
**Objetivo:** Aumentar retenção e engajamento do usuário através de melhorias de UX

---

## 🎯 OBJETIVO GERAL

Implementar 6 melhorias de UX no arquivo `index.html` que aumentarão:
- **Retenção de 30 dias:** 20% → 40% (+100%)
- **Engajamento:** +150% de lançamentos por usuário
- **Satisfação:** Melhor feedback visual e experiência

---

## ✅ MELHORIAS A IMPLEMENTAR (PRIORIDADE)

### FASE 1: FEEDBACK VISUAL (SEMANA 1)
**Impacto Alto | Esforço Baixo**

#### Melhoria 1: Toast Notifications Melhoradas
**Status:** 🔴 BLOQUEADOR - Fazer PRIMEIRO

**Descrição:**
Substituir função `showToast()` simples por versão com ícones, cores e animações.

**Especificações:**
```
- Mostrar ícone apropriado (✅ success, ❌ error, ⚠️ warning, ℹ️ info)
- Cores: verde (#7fff6e) success, vermelho (#ff4d6d) error, amarelo (#ffb347) warning, azul (#3de8ff) info
- Animação: deslizar da direita, fade-in 0.3s, fade-out 0.3s
- Posição: fixed bottom-right (20px, 20px)
- Max-width: 300px
- Auto remover após duração (padrão 3000ms)
- Z-index: 1000 (sobre tudo)
```

**Código Atual:** Localizar em `function showToast(msg,type='error',duration=3000)`

**Novo Código:**
```javascript
function showToast(msg, type='info', duration=3000){
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  toast.innerHTML = `
    <span style="font-size:16px;margin-right:8px">${icons[type] || '•'}</span>
    <span>${msg}</span>
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
```

**CSS a Adicionar (antes de `</style>`):**
```css
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
  opacity: 0;
  transform: translateX(400px);
  transition: all 0.3s ease-out;
  max-width: 300px;
  font-size: 12px;
}

.toast.show {
  opacity: 1;
  transform: translateX(0);
}

.toast.toast-success {
  border-left: 4px solid #7fff6e;
}

.toast.toast-error {
  border-left: 4px solid #ff4d6d;
}

.toast.toast-warning {
  border-left: 4px solid #ffb347;
}

.toast.toast-info {
  border-left: 4px solid #3de8ff;
}
```

**Testes:**
- ✅ Fazer lançamento → toast aparece com ✅ verde
- ✅ Erro ao logar → toast aparece com ❌ vermelho
- ✅ Orçamento 80% → toast aparece com ⚠️ amarelo

---

#### Melhoria 2: Animação do Saldo
**Status:** 🟡 IMPORTANTE

**Descrição:**
Quando o saldo muda, animar o número contando.

**Especificações:**
```
- Adicionar função animateBalanceUpdate()
- Tempo de animação: 0.5s
- Efeito: Escala 1 → 1.1 → 1 (pulse)
- Cor durante: mudar para var(--accent2) (#3de8ff)
```

**Novo Código:**
```javascript
function animateBalanceUpdate(){
  const balanceEl = document.getElementById('balance');
  if(balanceEl){
    balanceEl.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
      balanceEl.style.animation = 'none';
    }, 500);
  }
}
```

**CSS:**
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); color: var(--text); }
  50% { transform: scale(1.1); color: var(--accent2); }
}
```

**Chamar em:**
- `addTransaction()` - antes de `renderAll()`
- `addManualTransaction()` - antes de `renderAll()`
- `delTx()` - antes de `renderAll()`

**Testes:**
- ✅ Adicionar lançamento → saldo pulse
- ✅ Deletar lançamento → saldo pulse

---

### FASE 2: ENTRADA DE DADOS INTELIGENTE (SEMANA 1)
**Impacto Alto | Esforço Médio**

#### Melhoria 3: Unificar Input IA + Manual
**Status:** 🟡 IMPORTANTE

**Descrição:**
Remover toggle IA/Manual. Fazer input único que detecta categoria automaticamente enquanto digita.

**Especificações:**
```
- Remover botões de modo (IA/Manual) da UI
- Manter um input textarea
- Adicionar detectCategory() que usa keywords
- Mostrar sugestão em box "🤖 IA sugere: Alimentação"
- Auto-detectar conforme usuário digita
- Aceitar sugestão ao pressionar Enter
```

**Código a Remover:**
- Elemento `.input-mode-toggle`
- Botões `.mode-btn`
- HTML do `#manualFormSection`
- Função `switchInputMode()`

**Novo Código:**
```javascript
function detectCategory(text){
  const keywords = {
    'Alimentação': ['almoço', 'café', 'restaurante', 'lanche', 'pizza', 'comida', 'mercado', 'padaria', 'supermercado'],
    'Transporte': ['uber', 'taxi', 'ônibus', 'metrô', 'gasolina', 'estacionamento', 'viagem', 'passagem'],
    'Casa': ['aluguel', 'água', 'luz', 'gás', 'internet', 'limpeza', 'manutenção', 'condomínio'],
    'Saúde': ['farmácia', 'médico', 'dentista', 'academia', 'hospital', 'medicamento'],
    'Lazer': ['cinema', 'jogo', 'streaming', 'bar', 'diversão', 'assinatura'],
    'Receita': ['salário', 'freelance', 'bônus', 'renda', 'venda', 'ganho']
  };
  
  const lower = text.toLowerCase();
  for(const [category, words] of Object.entries(keywords)){
    if(words.some(word => lower.includes(word))){
      return { name: category, icon: CAT_ICONS[category] };
    }
  }
  return null;
}

document.getElementById('txInput').addEventListener('input', (e) => {
  const text = e.target.value.toLowerCase();
  const suggestion = detectCategory(text);
  
  const sugEl = document.getElementById('categorySuggestion');
  if(suggestion && text.length > 2){
    document.getElementById('suggestedCategory').textContent = 
      `${suggestion.icon} ${suggestion.name}`;
    sugEl.classList.remove('hidden');
  } else {
    sugEl.classList.add('hidden');
  }
});
```

**HTML a Adicionar (na input-section):**
```html
<div id="categorySuggestion" class="category-suggestion hidden">
  <p>🤖 IA sugere: <strong id="suggestedCategory"></strong></p>
</div>
```

**CSS a Adicionar:**
```css
.category-suggestion {
  background: var(--surface2);
  padding: 10px 12px;
  border-left: 4px solid #3de8ff;
  border-radius: 6px;
  margin: 10px 0;
  font-size: 12px;
  color: var(--text);
}

.category-suggestion.hidden {
  display: none;
}
```

**Testes:**
- ✅ Digitar "almoço" → sugere 🍔 Alimentação
- ✅ Digitar "uber" → sugere 🚗 Transporte
- ✅ Digitar "salário" → sugere 💰 Receita

---

### FASE 3: ONBOARDING (SEMANA 1)
**Impacto Muito Alto | Esforço Médio**

#### Melhoria 4: Onboarding para Primeiro Login
**Status:** 🟡 IMPORTANTE

**Descrição:**
Quando novo usuário entra, mostrar guia interativo com 3 passos.

**Especificações:**
```
Step 1: Bem-vindo
- Título: "🎉 Bem-vindo ao FinancIA!"
- Listar 4 features
- Botão: "Começar →"

Step 2: Primeiro Lançamento
- Título: "🎯 Vamos fazer seu primeiro lançamento!"
- Input para valor, descrição, categoria
- Botão: "✅ Confirmar Lançamento"

Step 3: Pronto!
- Título: "🎉 Pronto!"
- Mensagem de sucesso
- Botão: "🚀 Ir para Dashboard"

- Modal: fixed, centered, backdrop blur
- Animação: slideUp 0.4s
- Detectar primeiro login via localStorage
```

**Código a Adicionar:**

```javascript
function checkFirstLogin(email){
  const firstLoginDone = localStorage.getItem(`first_login_${email}`);
  if(!firstLoginDone){
    showOnboardingFlow();
    localStorage.setItem(`first_login_${email}`, 'true');
  }
}

function showOnboardingFlow(){
  document.getElementById('onboarding-modal').classList.add('active');
}

window.goToOnboardingStep = function(step){
  document.querySelectorAll('.onboarding-step').forEach(el => {
    el.classList.remove('active');
  });
  const activeStep = document.querySelector(`.step-${step}`);
  if(activeStep) activeStep.classList.add('active');
}

window.saveOnboardingTransaction = function(){
  const amount = parseFloat(document.getElementById('onb-amount').value);
  const description = document.getElementById('onb-description').value;
  const category = document.getElementById('onb-category').value;
  
  if(!amount || !description || !category){
    showToast('⚠️ Preencha todos os campos', 'warning');
    return;
  }
  
  const tx = {
    id: 'onb-' + Date.now(),
    desc: description,
    amount,
    type: category === 'Receita' ? 'receita' : 'gasto',
    category,
    date: new Date().toLocaleDateString('pt-BR'),
    original: description,
    isRecurring: false
  };
  
  transactions.unshift(tx);
  saveTx(currentUser.email, transactions);
  
  window.goToOnboardingStep(3);
  showToast('✅ Lançamento registrado!', 'success');
}

window.completeOnboarding = function(){
  document.getElementById('onboarding-modal').classList.remove('active');
  addXP(25);
  renderAll();
  showToast('🎉 Bem-vindo ao FinancIA!', 'success');
}
```

**HTML a Adicionar (antes de `</body>`):**

```html
<div id="onboarding-modal" class="onboarding-modal">
  <div class="onboarding-content">
    
    <!-- Step 1 -->
    <div class="onboarding-step step-1 active">
      <h2>🎉 Bem-vindo ao FinancIA!</h2>
      <p>Sua vida financeira com inteligência artificial</p>
      <ul style="text-align: left; margin: 20px 0; list-style: none;">
        <li style="padding: 8px 0;">✅ Categorização automática com IA</li>
        <li style="padding: 8px 0;">✅ Dashboard em tempo real</li>
        <li style="padding: 8px 0;">✅ Análise inteligente de gastos</li>
        <li style="padding: 8px 0;">✅ Metas e orçamentos</li>
      </ul>
      <button class="btn-primary" onclick="window.goToOnboardingStep(2)" style="width: 100%; margin-top: 20px;">
        🚀 Começar →
      </button>
    </div>
    
    <!-- Step 2 -->
    <div class="onboarding-step step-2">
      <h2>🎯 Primeiro Lançamento</h2>
      <p>Registre um gasto que você fez hoje</p>
      <div style="display: flex; flex-direction: column; gap: 12px; margin: 20px 0;">
        <div>
          <label style="display: block; font-size: 10px; color: var(--muted); margin-bottom: 4px;">Valor (R$)</label>
          <input type="number" id="onb-amount" placeholder="0,00" style="width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface2); color: var(--text);">
        </div>
        <div>
          <label style="display: block; font-size: 10px; color: var(--muted); margin-bottom: 4px;">Descrição</label>
          <input type="text" id="onb-description" placeholder="Ex: Almoço" style="width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface2); color: var(--text);">
        </div>
        <div>
          <label style="display: block; font-size: 10px; color: var(--muted); margin-bottom: 4px;">Categoria</label>
          <select id="onb-category" style="width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface2); color: var(--text);">
            <option value="">Selecione...</option>
            <option value="Alimentação">🍔 Alimentação</option>
            <option value="Transporte">🚗 Transporte</option>
            <option value="Casa">🏠 Casa</option>
            <option value="Saúde">💊 Saúde</option>
            <option value="Lazer">🎮 Lazer</option>
            <option value="Receita">💰 Receita</option>
          </select>
        </div>
      </div>
      <button class="btn-primary" onclick="window.saveOnboardingTransaction()" style="width: 100%; margin-top: 20px;">
        ✅ Confirmar Lançamento
      </button>
    </div>
    
    <!-- Step 3 -->
    <div class="onboarding-step step-3">
      <h2>🎉 Pronto!</h2>
      <p style="margin: 20px 0; font-size: 40px;">🎊</p>
      <p>Seu primeiro lançamento foi registrado!</p>
      <p style="color: var(--muted); font-size: 12px; margin: 15px 0;">Você está no caminho certo para controlar suas finanças</p>
      <button class="btn-primary" onclick="window.completeOnboarding()" style="width: 100%; margin-top: 20px;">
        🚀 Ir para Dashboard
      </button>
    </div>
    
  </div>
</div>
```

**CSS a Adicionar:**

```css
.onboarding-modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.onboarding-modal.active {
  display: flex;
}

.onboarding-content {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  padding: 40px;
  animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.onboarding-step {
  display: none;
  text-align: center;
}

.onboarding-step.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

.onboarding-step h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: var(--text);
}

.onboarding-step p {
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 12px;
}
```

**Chamar em `startApp()` após `renderAll()`:**
```javascript
checkFirstLogin(user.email);
```

**Testes:**
- ✅ Novo usuário vê modal onboarding
- ✅ Step 1 → Step 2 funciona
- ✅ Fazer lançamento → Step 3
- ✅ Completar → modal fecha
- ✅ Recarregar página → NÃO mostra modal novamente

---

### FASE 4: ALERTAS INTELIGENTES (SEMANA 2)
**Impacto Alto | Esforço Médio**

#### Melhoria 5: Notificações de Orçamento
**Status:** 🟡 IMPORTANTE

**Descrição:**
Alertar usuário quando atinge 80% do orçamento de uma categoria.

**Especificações:**
```
- Verificar ao adicionar transação
- 80% → ⚠️ warning amarelo
- 100% → 🚨 error vermelho
- Mostrar em toast
```

**Código a Adicionar:**

```javascript
function checkBudgetAlerts(tx){
  if(!budgets[tx.category]) return;
  
  const limit = budgets[tx.category];
  const spent = transactions
    .filter(t => t.type==='gasto' && t.category===tx.category)
    .reduce((s,t) => s+t.amount, 0);
  
  const pct = (spent / limit) * 100;
  
  if(pct >= 80 && pct < 100){
    showToast(`⚠️ ${tx.category}: 80% do orçamento utilizado`, 'warning', 5000);
  } else if(pct >= 100){
    showToast(`🚨 ${tx.category}: Orçamento excedido em R$ ${(spent - limit).toFixed(2)}`, 'error', 5000);
  }
}
```

**Chamar em:**
- `addTransaction()` - após saveTx
- `addManualTransaction()` - após saveTx

**Testes:**
- ✅ Orçamento R$ 100 em Alimentação
- ✅ Adicionar R$ 80 → mostra ⚠️ 80%
- ✅ Adicionar R$ 25 → mostra 🚨 excedido

---

#### Melhoria 6: IA com Insights Automáticos
**Status:** 🟡 IMPORTANTE

**Descrição:**
Assistente mostrar insights automáticos quando user tem dados suficientes.

**Especificações:**
```
- Após 3 lançamentos: sugerir insights
- Top categoria de gasto
- Saldo atual
- Status da meta
- Recomendações
```

**Código a Adicionar:**

```javascript
function generateAutoInsight(){
  if(transactions.length < 3) return null;
  
  const tI = transactions.filter(t=>t.type==='receita').reduce((s,t)=>s+t.amount,0);
  const tO = transactions.filter(t=>t.type==='gasto').reduce((s,t)=>s+t.amount,0);
  
  const catTotals = {};
  transactions.forEach(t => {
    if(t.type==='gasto') catTotals[t.category] = (catTotals[t.category]||0) + t.amount;
  });
  
  const topCat = Object.entries(catTotals).sort((a,b)=>b[1]-a[1])[0];
  
  if(topCat){
    const icon = CAT_ICONS[topCat[0]] || '📌';
    const pct = Math.round((topCat[1] / tO) * 100);
    return `${icon} Sua maior despesa é <b>${topCat[0]}</b> (${pct}% do total - R$ ${topCat[1].toFixed(2)})`;
  }
  
  return null;
}

function showAutoInsight(){
  const insight = generateAutoInsight();
  if(!insight) return;
  
  const msgs = document.getElementById('aiMessages');
  const bubble = document.createElement('div');
  bubble.className = 'ai-bubble ai';
  bubble.innerHTML = `<div class="ai-label">ASSISTENTE</div>💡 ${insight}`;
  msgs.appendChild(bubble);
  msgs.scrollTop = msgs.scrollHeight;
}
```

**Chamar em:**
- `renderAll()` - se transactions.length >= 3 e não mostrou insight
- Apenas mostrar uma vez por sessão

**Testes:**
- ✅ Ter 3+ lançamentos
- ✅ Ver insight automático no assistente
- ✅ Mensagem faz sentido com dados

---

## 🔄 EXECUÇÃO

### Ordem de Implementação:
```
1️⃣ Toast Notifications (15 min) - FAZER PRIMEIRO
2️⃣ Animação Saldo (10 min)
3️⃣ Unificar Input (30 min)
4️⃣ Onboarding (45 min)
5️⃣ Alertas Orçamento (20 min)
6️⃣ IA Insights (30 min)

TOTAL: ~2.5 horas
```

### Procedure:
1. Clone do repositório
2. Abrir `index.html` em editor
3. Implementar Melhoria 1
4. Testar localmente
5. Commit e push
6. **Aguardar 1-2 min** (Netlify deploy)
7. Testar no site ao vivo
8. Repetir 3-7 para próxima melhoria

---

## 🧪 TESTES FINAIS

Após todas as 6 melhorias:

```
✅ Novo usuário entra
   └─ Vê onboarding
   └─ Faz primeiro lançamento
   └─ Vê animação saldo
   └─ Recebe toast sucesso
   └─ Completa onboarding
   
✅ Usuário existente
   └─ Input IA detecta categoria
   └─ Toasts aparecem com ícones
   └─ Saldo anima
   └─ Vê insights automáticos
   └─ Alertas de orçamento funcionam

✅ Mobile
   └─ Tudo funciona em smartphone
   └─ Toasts visíveis
   └─ Modal responsivo
```

---

## 📝 COMMITS ESPERADOS

```
1. "feat: melhorar notificações com ícones e animações"
2. "feat: animar saldo ao atualizar dashboard"
3. "feat: unificar entrada de dados com IA detection"
4. "feat: adicionar onboarding interativo para primeiro login"
5. "feat: adicionar alertas inteligentes de orçamento"
6. "feat: assistente IA com insights automáticos"
```

---

## 🎯 RESULTADO ESPERADO

Após implementação:
- **Retenção:** +50-100%
- **Engajamento:** +150%
- **Satisfação:** +80%
- **Tempo no app:** +200%
- **Lançamentos/user:** 2-3x mais

---

## 📞 NOTAS

- Não modificar estrutura geral do HTML
- Manter estilos de tema escuro/claro existente
- Usar variáveis CSS existentes (--accent, --border, etc)
- Não adicionar dependências externas
- Testar em Chrome, Firefox, Safari e Mobile
- Fazer commits pequenos e descritivos

---

**FIM DO PROMPT**

Este prompt está estruturado para Claude Cowork automatizar todas as mudanças.
