const exerciseMenu = document.getElementById('exerciseMenu');
const mainTitle = document.getElementById('mainTitle');
const mainDescription = document.getElementById('mainDescription');
const exerciseControls = document.getElementById('exerciseControls');
const exerciseResult = document.getElementById('exerciseResult');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

const state = {
  activeExercise: 1,
  stopwatch: null,
  stopwatchTime: 0,
  guessNumber: 0,
  guessAttempts: 0,
  bankAccount: {
    balance: 0,
    transactions: [],
  },
};

const exercises = [
  {
    id: 1,
    title: 'Olá Mundo',
    description: 'Exiba uma mensagem simples de boas-vindas usando JavaScript. Use um botão para mostrar o resultado.',
    render: renderHelloWorld,
  },
  {
    id: 2,
    title: 'Soma de dois números',
    description: 'Receba dois valores numéricos e mostre a soma deles com validação.',
    render: renderSumTwoNumbers,
  },
  {
    id: 3,
    title: 'Número par ou ímpar',
    description: 'Identifique se o número informado é par ou ímpar.',
    render: renderEvenOdd,
  },
  {
    id: 4,
    title: 'Maior entre dois números',
    description: 'Compare dois números e informe qual é o maior ou se são iguais.',
    render: renderMaxOfTwo,
  },
  {
    id: 5,
    title: 'Tabuada',
    description: 'Gere a tabuada de um número para valores entre 1 e 10.',
    render: renderMultiplicationTable,
  },
  {
    id: 6,
    title: 'Contagem de 1 até 100',
    description: 'Exiba uma contagem de 1 até 100 no resultado.',
    render: renderCountOneToHundred,
  },
  {
    id: 7,
    title: 'Calculadora (+ - × ÷)',
    description: 'Faça operações básicas com dois valores e selecione o operador.',
    render: renderCalculator,
  },
  {
    id: 8,
    title: 'Conversor Celsius para Fahrenheit',
    description: 'Converta temperaturas de Celsius para Fahrenheit com validação de entrada.',
    render: renderCelsiusToFahrenheit,
  },
  {
    id: 9,
    title: 'Média de três notas com aprovação',
    description: 'Calcule a média de três notas e informe se o aluno foi aprovado.',
    render: renderThreeGradesAverage,
  },
  {
    id: 10,
    title: 'Fatorial',
    description: 'Calcule o fatorial de um número inteiro não negativo.',
    render: renderFactorial,
  },
  {
    id: 11,
    title: 'Maior elemento de um array',
    description: 'Receba uma lista de números e mostre o maior elemento.',
    render: renderLargestArrayElement,
  },
  {
    id: 12,
    title: 'Inverter uma string',
    description: 'Inverta uma palavra ou frase digitada pelo usuário.',
    render: renderReverseString,
  },
  {
    id: 13,
    title: 'Contador de vogais',
    description: 'Conte quantas vogais aparecem em uma frase.',
    render: renderVowelCounter,
  },
  {
    id: 14,
    title: 'Remover duplicados',
    description: 'Remova valores duplicados de uma lista e mostre apenas itens únicos.',
    render: renderRemoveDuplicates,
  },
  {
    id: 15,
    title: 'Palíndromo',
    description: 'Verifique se uma frase é palíndroma ignorando espaços e pontuação.',
    render: renderPalindrome,
  },
  {
    id: 16,
    title: 'Ordenação de array',
    description: 'Ordene uma lista de números em ordem crescente ou decrescente.',
    render: renderArraySorting,
  },
  {
    id: 17,
    title: 'Contagem de palavras',
    description: 'Conte quantas palavras existem em um texto fornecido.',
    render: renderWordCount,
  },
  {
    id: 18,
    title: 'Gerador de senha',
    description: 'Crie uma senha segura com tamanho configurável.',
    render: renderPasswordGenerator,
  },
  {
    id: 19,
    title: 'Objeto Aluno calculando média',
    description: 'Crie um objeto aluno e calcule a média das notas informadas.',
    render: renderStudentObject,
  },
  {
    id: 20,
    title: 'Filtro de números pares usando filter()',
    description: 'Filtre uma lista de números e mostre apenas os pares.',
    render: renderFilterEvenNumbers,
  },
  {
    id: 21,
    title: 'CRUD de usuários usando localStorage',
    description: 'Adicione, edite e exclua usuários com persistência no localStorage.',
    render: renderUsersCrud,
  },
  {
    id: 22,
    title: 'Consumir uma API pública',
    description: 'Busque dados de uma API pública e exiba as informações retornadas.',
    render: renderFetchApi,
  },
  {
    id: 23,
    title: 'Lista de tarefas (To-Do List)',
    description: 'Gerencie tarefas com criação, marcação como feita e exclusão, usando localStorage.',
    render: renderTodoList,
  },
  {
    id: 24,
    title: 'Cronômetro',
    description: 'Inicie, pause e zere um cronômetro funcional.',
    render: renderStopwatch,
  },
  {
    id: 25,
    title: 'Exemplo funcional de Debounce',
    description: 'Simule uma busca com debounce em um campo de pesquisa.',
    render: renderDebounceExample,
  },
  {
    id: 26,
    title: 'Promise personalizada',
    description: 'Simule uma operação assíncrona personalizada com Promise.',
    render: renderCustomPromise,
  },
  {
    id: 27,
    title: 'Sistema de carrinho de compras',
    description: 'Adicione produtos ao carrinho e calcule o total de itens e preço.',
    render: renderShoppingCart,
  },
  {
    id: 28,
    title: 'Jogo da adivinhação',
    description: 'Tente adivinhar o número secreto com pistas e limite de tentativas.',
    render: renderGuessingGame,
  },
  {
    id: 29,
    title: 'Manipulação do DOM',
    description: 'Crie, edite e remova elementos dinamicamente.',
    render: renderDomManipulation,
  },
  {
    id: 30,
    title: 'Mini Sistema Bancário',
    description: 'Deposite, saque, consulte saldo e veja extrato com regras básicas.',
    render: renderBankSystem,
  },
];

function createLabel(text, htmlFor) {
  const label = document.createElement('label');
  label.textContent = text;
  if (htmlFor) label.htmlFor = htmlFor;
  return label;
}

function createInput(type, id, placeholder = '') {
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.placeholder = placeholder;
  return input;
}

function createButton(text, className = 'button') {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = text;
  button.className = className;
  return button;
}

function clearExercise() {
  exerciseControls.innerHTML = '';
  exerciseResult.innerHTML = '';
}

function setResult(content) {
  exerciseResult.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'result-box';
  if (typeof content === 'string') {
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    box.appendChild(paragraph);
  } else if (content instanceof HTMLElement) {
    box.appendChild(content);
  } else if (Array.isArray(content)) {
    const list = document.createElement('ul');
    list.className = 'result-list';
    content.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    box.appendChild(list);
  }
  exerciseResult.appendChild(box);
}

function setResultHTML(html) {
  exerciseResult.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'result-box';
  box.innerHTML = html;
  exerciseResult.appendChild(box);
}

function loadExercise(id) {
  state.activeExercise = id;
  const exercise = exercises.find((item) => item.id === id);
  if (!exercise) return;
  const buttons = exerciseMenu.querySelectorAll('button');
  buttons.forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.id) === id);
  });
  mainTitle.textContent = `Exercício ${exercise.id}: ${exercise.title}`;
  mainDescription.textContent = exercise.description;
  clearExercise();
  exercise.render();
}

function buildMenu() {
  exercises.forEach((exercise) => {
    const button = document.createElement('button');
    button.textContent = `${exercise.id}. ${exercise.title}`;
    button.dataset.id = exercise.id;
    button.addEventListener('click', () => loadExercise(exercise.id));
    exerciseMenu.appendChild(button);
  });
}

function showAlert(message) {
  setResultHTML(`<div class="alert">${message}</div>`);
}

function parseNumbers(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item !== '')
    .map(Number)
    .filter((num) => !Number.isNaN(num));
}

function formatCurrency(value) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function renderHelloWorld() {
  const button = createButton('Mostrar mensagem');
  button.addEventListener('click', () => setResult('Olá, mundo! Bem-vindo aos 30 exercícios de JavaScript.'));
  exerciseControls.appendChild(button);
}

function renderSumTwoNumbers() {
  const field1 = document.createElement('div');
  field1.className = 'field-group';
  field1.appendChild(createLabel('Primeiro número', 'sumA'));
  field1.appendChild(createInput('number', 'sumA', 'Ex: 10'));
  const field2 = document.createElement('div');
  field2.className = 'field-group';
  field2.appendChild(createLabel('Segundo número', 'sumB'));
  field2.appendChild(createInput('number', 'sumB', 'Ex: 25'));
  const button = createButton('Calcular soma');
  button.addEventListener('click', () => {
    const a = Number(document.getElementById('sumA').value);
    const b = Number(document.getElementById('sumB').value);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      showAlert('Preencha os dois números corretamente.');
      return;
    }
    setResult(`A soma de ${a} + ${b} é ${a + b}.`);
  });
  exerciseControls.append(field1, field2, button);
}

function renderEvenOdd() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Número', 'parImpar'));
  field.appendChild(createInput('number', 'parImpar', 'Digite um número inteiro'));
  const button = createButton('Verificar');
  button.addEventListener('click', () => {
    const value = document.getElementById('parImpar').value.trim();
    const number = Number(value);
    if (value === '' || !Number.isInteger(number)) {
      showAlert('Informe um número inteiro válido.');
      return;
    }
    const result = number % 2 === 0 ? 'par' : 'ímpar';
    setResult(`O número ${number} é ${result}.`);
  });
  exerciseControls.append(field, button);
}

function renderMaxOfTwo() {
  const fieldA = document.createElement('div');
  fieldA.className = 'field-group';
  fieldA.appendChild(createLabel('Primeiro número', 'maxA'));
  fieldA.appendChild(createInput('number', 'maxA', 'Ex: 18'));
  const fieldB = document.createElement('div');
  fieldB.className = 'field-group';
  fieldB.appendChild(createLabel('Segundo número', 'maxB'));
  fieldB.appendChild(createInput('number', 'maxB', 'Ex: 22'));
  const button = createButton('Comparar');
  button.addEventListener('click', () => {
    const a = Number(document.getElementById('maxA').value);
    const b = Number(document.getElementById('maxB').value);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      showAlert('Preencha os dois valores corretamente.');
      return;
    }
    const message = a === b ? 'Os números são iguais.' : `O maior número é ${Math.max(a, b)}.`;
    setResult(message);
  });
  exerciseControls.append(fieldA, fieldB, button);
}

function renderMultiplicationTable() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Número para tabuada', 'tabuadaInput'));
  field.appendChild(createInput('number', 'tabuadaInput', 'Ex: 7'));
  const button = createButton('Gerar tabuada');
  button.addEventListener('click', () => {
    const value = Number(document.getElementById('tabuadaInput').value);
    if (Number.isNaN(value)) {
      showAlert('Digite um número válido para a tabuada.');
      return;
    }
    const list = document.createElement('ul');
    list.className = 'result-list';
    for (let i = 1; i <= 10; i += 1) {
      const item = document.createElement('li');
      item.textContent = `${value} × ${i} = ${value * i}`;
      list.appendChild(item);
    }
    exerciseResult.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'result-box';
    box.appendChild(list);
    exerciseResult.appendChild(box);
  });
  exerciseControls.append(field, button);
}

function renderCountOneToHundred() {
  const button = createButton('Exibir contagem');
  button.addEventListener('click', () => {
    const lines = [];
    for (let i = 1; i <= 100; i += 1) {
      lines.push(`• ${i}`);
    }
    setResultHTML(`<code>${lines.join('\n')}</code>`);
  });
  exerciseControls.append(button);
}

function renderCalculator() {
  const fieldA = document.createElement('div');
  fieldA.className = 'field-group';
  fieldA.appendChild(createLabel('Valor A', 'calcA'));
  fieldA.appendChild(createInput('number', 'calcA', 'Ex: 12'));
  const fieldB = document.createElement('div');
  fieldB.className = 'field-group';
  fieldB.appendChild(createLabel('Valor B', 'calcB'));
  fieldB.appendChild(createInput('number', 'calcB', 'Ex: 3'));
  const operatorField = document.createElement('div');
  operatorField.className = 'field-group';
  operatorField.appendChild(createLabel('Operação', 'operator'));
  const select = document.createElement('select');
  select.id = 'operator';
  ['+', '-', '×', '÷'].forEach((symbol) => {
    const option = document.createElement('option');
    option.value = symbol;
    option.textContent = symbol;
    select.appendChild(option);
  });
  operatorField.appendChild(select);
  const button = createButton('Calcular');
  button.addEventListener('click', () => {
    const a = Number(document.getElementById('calcA').value);
    const b = Number(document.getElementById('calcB').value);
    const operator = document.getElementById('operator').value;
    if (Number.isNaN(a) || Number.isNaN(b)) {
      showAlert('Informe dois números válidos.');
      return;
    }
    let result;
    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '×': result = a * b; break;
      case '÷':
        if (b === 0) {
          showAlert('Não é possível dividir por zero.');
          return;
        }
        result = a / b;
        break;
      default:
        result = 0;
    }
    setResult(`Resultado: ${a} ${operator} ${b} = ${result}`);
  });
  exerciseControls.append(fieldA, fieldB, operatorField, button);
}

function renderCelsiusToFahrenheit() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Temperatura em Celsius', 'celsiusInput'));
  field.appendChild(createInput('number', 'celsiusInput', 'Ex: 25'));
  const button = createButton('Converter');
  button.addEventListener('click', () => {
    const celsius = Number(document.getElementById('celsiusInput').value);
    if (Number.isNaN(celsius)) {
      showAlert('Informe uma temperatura válida.');
      return;
    }
    const fahrenheit = (celsius * 9) / 5 + 32;
    setResult(`${celsius.toFixed(1)} °C equivalem a ${fahrenheit.toFixed(1)} °F.`);
  });
  exerciseControls.append(field, button);
}

function renderThreeGradesAverage() {
  const fields = [];
  ['Primeira nota', 'Segunda nota', 'Terceira nota'].forEach((labelText, index) => {
    const field = document.createElement('div');
    field.className = 'field-group';
    const id = `grade${index + 1}`;
    field.appendChild(createLabel(labelText, id));
    field.appendChild(createInput('number', id, '0 a 10'));
    fields.push(field);
    exerciseControls.appendChild(field);
  });
  const button = createButton('Calcular média');
  button.addEventListener('click', () => {
    const values = [1, 2, 3].map((index) => Number(document.getElementById(`grade${index}`).value));
    if (values.some((value) => Number.isNaN(value) || value < 0 || value > 10)) {
      showAlert('Informe todas as notas entre 0 e 10.');
      return;
    }
    const average = values.reduce((acc, cur) => acc + cur, 0) / values.length;
    const status = average >= 7 ? 'Aprovado' : 'Reprovado';
    setResult(`Média: ${average.toFixed(1)} — ${status}.`);
  });
  exerciseControls.appendChild(button);
}

function renderFactorial() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Número inteiro não negativo', 'factorialInput'));
  field.appendChild(createInput('number', 'factorialInput', 'Ex: 6'));
  const button = createButton('Calcular fatorial');
  button.addEventListener('click', () => {
    const value = Number(document.getElementById('factorialInput').value);
    if (!Number.isInteger(value) || value < 0) {
      showAlert('Informe um número inteiro não negativo.');
      return;
    }
    let result = 1;
    for (let i = 2; i <= value; i += 1) {
      result *= i;
    }
    setResult(`${value}! = ${result}`);
  });
  exerciseControls.append(field, button);
}

function renderLargestArrayElement() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Números separados por vírgula', 'largestInput'));
  field.appendChild(createInput('text', 'largestInput', 'Ex: 5, 12, 3, 8'));
  const button = createButton('Encontrar maior número');
  button.addEventListener('click', () => {
    const value = document.getElementById('largestInput').value;
    const numbers = parseNumbers(value);
    if (numbers.length === 0) {
      showAlert('Digite uma lista de números válidos.');
      return;
    }
    setResult(`O maior número da lista é ${Math.max(...numbers)}.`);
  });
  exerciseControls.append(field, button);
}

function renderReverseString() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Texto', 'reverseInput'));
  field.appendChild(createInput('text', 'reverseInput', 'Digite uma palavra ou frase'));
  const button = createButton('Inverter texto');
  button.addEventListener('click', () => {
    const value = document.getElementById('reverseInput').value.trim();
    if (!value) {
      showAlert('Digite um texto para inverter.');
      return;
    }
    setResult(value.split('').reverse().join(''));
  });
  exerciseControls.append(field, button);
}

function renderVowelCounter() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Frase', 'vowelInput'));
  field.appendChild(createInput('text', 'vowelInput', 'Ex: Olá mundo'));
  const button = createButton('Contar vogais');
  button.addEventListener('click', () => {
    const value = document.getElementById('vowelInput').value;
    if (!value.trim()) {
      showAlert('Digite uma frase válida.');
      return;
    }
    const count = (value.match(/[aeiouáéíóúãõâêîôûAEIOUÀÁÂÃÉÊÍÎÓÔÕÚÜ]/g) || []).length;
    setResult(`A frase contém ${count} vogal(is).`);
  });
  exerciseControls.append(field, button);
}

function renderRemoveDuplicates() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Valores separados por vírgula', 'uniqueInput'));
  field.appendChild(createInput('text', 'uniqueInput', 'Ex: a, b, a, c'));
  const button = createButton('Remover duplicados');
  button.addEventListener('click', () => {
    const raw = document.getElementById('uniqueInput').value;
    const items = raw
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');
    if (items.length === 0) {
      showAlert('Digite pelo menos um valor.');
      return;
    }
    const unique = [...new Set(items)];
    setResult(`Itens únicos: ${unique.join(', ')}`);
  });
  exerciseControls.append(field, button);
}

function renderPalindrome() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Texto', 'palindromeInput'));
  field.appendChild(createInput('text', 'palindromeInput', 'Ex: A man a plan a canal Panama'));
  const button = createButton('Verificar palíndromo');
  button.addEventListener('click', () => {
    const raw = document.getElementById('palindromeInput').value;
    if (!raw.trim()) {
      showAlert('Digite um texto para verificar.');
      return;
    }
    const normalized = raw.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = normalized.split('').reverse().join('');
    const isPalindrome = normalized === reversed;
    setResult(isPalindrome ? 'É um palíndromo!' : 'Não é um palíndromo.');
  });
  exerciseControls.append(field, button);
}

function renderArraySorting() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Números separados por vírgula', 'sortInput'));
  field.appendChild(createInput('text', 'sortInput', 'Ex: 34, 7, 45, 1'));
  const optionField = document.createElement('div');
  optionField.className = 'field-group';
  optionField.appendChild(createLabel('Tipo de ordenação', 'sortOrder'));
  const select = document.createElement('select');
  select.id = 'sortOrder';
  ['Crescente', 'Decrescente'].forEach((label) => {
    const option = document.createElement('option');
    option.value = label.toLowerCase();
    option.textContent = label;
    select.appendChild(option);
  });
  optionField.appendChild(select);
  const button = createButton('Ordenar lista');
  button.addEventListener('click', () => {
    const numbers = parseNumbers(document.getElementById('sortInput').value);
    if (numbers.length === 0) {
      showAlert('Informe uma lista válida de números.');
      return;
    }
    const sorted = numbers.sort((a, b) => a - b);
    if (select.value === 'decrescente') sorted.reverse();
    setResult(`Resultado: ${sorted.join(', ')}`);
  });
  exerciseControls.append(field, optionField, button);
}

function renderWordCount() {
  const field = document.createElement('div');
  field.className = 'field-group';
  const textarea = document.createElement('textarea');
  textarea.id = 'wordText';
  textarea.placeholder = 'Digite um parágrafo ou frase para contar palavras.';
  field.appendChild(createLabel('Texto', 'wordText'));
  field.appendChild(textarea);
  const button = createButton('Contar palavras');
  button.addEventListener('click', () => {
    const text = document.getElementById('wordText').value.trim();
    if (!text) {
      showAlert('Digite um texto para contar.');
      return;
    }
    const count = text.split(/\s+/).filter((word) => word !== '').length;
    setResult(`Foram encontradas ${count} palavra(s).`);
  });
  exerciseControls.append(field, button);
}

function renderPasswordGenerator() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Tamanho da senha', 'passwordLength'));
  const input = createInput('number', 'passwordLength', 'Ex: 12');
  input.value = 12;
  field.appendChild(input);
  const button = createButton('Gerar senha');
  button.addEventListener('click', () => {
    const length = Number(document.getElementById('passwordLength').value);
    if (!Number.isInteger(length) || length < 6 || length > 32) {
      showAlert('Informe um tamanho entre 6 e 32.');
      return;
    }
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i += 1) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setResult(`Senha gerada: ${password}`);
  });
  exerciseControls.append(field, button);
}

function renderStudentObject() {
  const formFields = [];
  ['Nome do aluno', 'Nota 1', 'Nota 2', 'Nota 3'].forEach((labelText, index) => {
    const field = document.createElement('div');
    field.className = 'field-group';
    const id = `student${index}`;
    field.appendChild(createLabel(labelText, id));
    field.appendChild(createInput(index === 0 ? 'text' : 'number', id, index === 0 ? 'Ex: João' : '0 a 10'));
    formFields.push(field);
    exerciseControls.appendChild(field);
  });
  const button = createButton('Calcular média do aluno');
  button.addEventListener('click', () => {
    const name = document.getElementById('student0').value.trim();
    const grades = [1, 2, 3].map((index) => Number(document.getElementById(`student${index}`).value));
    if (!name || grades.some((grade) => Number.isNaN(grade) || grade < 0 || grade > 10)) {
      showAlert('Preencha o nome e as três notas corretamente.');
      return;
    }
    const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    setResultHTML(`<strong>Aluno:</strong> ${name}<br><strong>Média:</strong> ${average.toFixed(1)}<br><strong>Status:</strong> ${average >= 7 ? 'Aprovado' : 'Reprovado'}`);
  });
  exerciseControls.appendChild(button);
}

function renderFilterEvenNumbers() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Números separados por vírgula', 'filterInput'));
  field.appendChild(createInput('text', 'filterInput', 'Ex: 1, 4, 9, 10'));
  const button = createButton('Filtrar pares');
  button.addEventListener('click', () => {
    const numbers = parseNumbers(document.getElementById('filterInput').value);
    if (numbers.length === 0) {
      showAlert('Informe uma lista de números.');
      return;
    }
    const evenNumbers = numbers.filter((num) => num % 2 === 0);
    setResult(`Números pares: ${evenNumbers.length ? evenNumbers.join(', ') : 'Nenhum número par encontrado.'}`);
  });
  exerciseControls.append(field, button);
}

function getUsersStorage() {
  const raw = localStorage.getItem('exercise21Users');
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function setUsersStorage(users) {
  localStorage.setItem('exercise21Users', JSON.stringify(users));
}

function renderUsersCrud() {
  const nameField = document.createElement('div');
  nameField.className = 'field-group';
  nameField.appendChild(createLabel('Nome', 'userName'));
  nameField.appendChild(createInput('text', 'userName', 'Ex: Maria')); 
  const emailField = document.createElement('div');
  emailField.className = 'field-group';
  emailField.appendChild(createLabel('Email', 'userEmail'));
  emailField.appendChild(createInput('email', 'userEmail', 'Ex: maria@exemplo.com'));
  const buttonAdd = createButton('Adicionar usuário');
  const userList = document.createElement('div');
  exerciseControls.append(nameField, emailField, buttonAdd, userList);

  function refreshList() {
    const users = getUsersStorage();
    userList.innerHTML = '';
    if (users.length === 0) {
      userList.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
      return;
    }
    users.forEach((user, index) => {
      const item = document.createElement('div');
      item.className = 'result-box';
      item.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
      const actionRow = document.createElement('div');
      actionRow.className = 'controls-row';
      const editButton = createButton('Editar', 'small-button');
      const deleteButton = createButton('Excluir', 'small-button');
      editButton.addEventListener('click', () => {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        buttonAdd.textContent = 'Salvar alterações';
        buttonAdd.dataset.editIndex = index;
      });
      deleteButton.addEventListener('click', () => {
        const updatedUsers = getUsersStorage().filter((_, idx) => idx !== index);
        setUsersStorage(updatedUsers);
        refreshList();
        setResult('Usuário removido com sucesso.');
      });
      actionRow.append(editButton, deleteButton);
      item.appendChild(actionRow);
      userList.appendChild(item);
    });
  }

  buttonAdd.addEventListener('click', () => {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    if (!name || !email || !email.includes('@')) {
      showAlert('Informe nome e email válidos.');
      return;
    }
    const users = getUsersStorage();
    if (buttonAdd.dataset.editIndex) {
      const index = Number(buttonAdd.dataset.editIndex);
      users[index] = { name, email };
      buttonAdd.textContent = 'Adicionar usuário';
      delete buttonAdd.dataset.editIndex;
      setResult('Usuário atualizado com sucesso.');
    } else {
      users.push({ name, email });
      setResult('Usuário adicionado com sucesso.');
    }
    setUsersStorage(users);
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    refreshList();
  });

  refreshList();
}

function renderFetchApi() {
  const info = document.createElement('div');
  info.className = 'field-group';
  info.appendChild(createLabel('Consulte uma API pública aleatória', null));
  info.appendChild(document.createElement('p'));
  info.querySelector('p').textContent = 'Clique no botão para buscar dados de uma API aleatória usando fetch e async/await.';

  const button = createButton('Buscar API Aleatória');
  button.addEventListener('click', async () => {
    setResult('Buscando API aleatória...');
    try {
      const response = await fetch('https://www.freepublicapis.com/api/random');
      if (!response.ok) {
        throw new Error('Resposta da API não foi bem-sucedida.');
      }
      const data = await response.json();
      if (!data || typeof data !== 'object') {
        throw new Error('Formato de dados inválido.');
      }

      const name = data.title || data.name || 'Não informado';
      const description = data.description || 'Não informado';
      const category = data.category || 'Não informado';
      const methods = data.methods !== undefined ? String(data.methods) : 'Não informado';
      const documentation = data.documentation || data.source || '';
      const emoji = data.emoji || 'Não informado';
      const health = data.health !== undefined ? String(data.health) : 'Não informado';

      const documentationLink = documentation ? documentation : '#';
      const documentationText = documentation ? documentation : 'Não disponível';

      setResultHTML(`
        <div class="result-box">
          <div class="detail"><strong>Nome da API</strong><p>${name}</p></div>
          <div class="detail"><strong>Descrição</strong><p>${description}</p></div>
          <div class="detail"><strong>Categoria</strong><p>${category}</p></div>
          <div class="detail"><strong>Métodos HTTP</strong><p>${methods}</p></div>
          <div class="detail"><strong>Emoji</strong><p>${emoji}</p></div>
          <div class="detail"><strong>Health</strong><p>${health}</p></div>
          <div class="detail"><strong>Documentação</strong><p>${documentation ? `<a href="${documentationLink}" target="_blank" rel="noopener noreferrer">Abrir documentação</a>` : documentationText}</p></div>
        </div>
      `);
    } catch (error) {
      showAlert('Não foi possível carregar a API. Verifique sua conexão e tente novamente.');
      console.error(error);
    }
  });

  exerciseControls.append(info, button);
}

function getTodoStorage() {
  const raw = localStorage.getItem('exercise23Todos');
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function setTodoStorage(todos) {
  localStorage.setItem('exercise23Todos', JSON.stringify(todos));
}

function renderTodoList() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Nova tarefa', 'todoText'));
  field.appendChild(createInput('text', 'todoText', 'Ex: Estudar JavaScript'));
  const button = createButton('Adicionar tarefa');
  const listContainer = document.createElement('div');
  exerciseControls.append(field, button, listContainer);

  function refreshTasks() {
    const todos = getTodoStorage();
    listContainer.innerHTML = '';
    if (todos.length === 0) {
      listContainer.innerHTML = '<p>Nenhuma tarefa cadastrada.</p>';
      return;
    }
    todos.forEach((task, index) => {
      const item = document.createElement('div');
      item.className = 'result-box';
      item.innerHTML = `<p>${task.completed ? '✅' : '🕒'} ${task.text}</p>`;
      const row = document.createElement('div');
      row.className = 'controls-row';
      const completeBtn = createButton(task.completed ? 'Desmarcar' : 'Concluir', 'small-button');
      const deleteBtn = createButton('Excluir', 'small-button');
      completeBtn.addEventListener('click', () => {
        todos[index].completed = !todos[index].completed;
        setTodoStorage(todos);
        refreshTasks();
      });
      deleteBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        setTodoStorage(todos);
        refreshTasks();
      });
      row.append(completeBtn, deleteBtn);
      item.appendChild(row);
      listContainer.appendChild(item);
    });
  }

  button.addEventListener('click', () => {
    const text = document.getElementById('todoText').value.trim();
    if (!text) {
      showAlert('Digite a descrição da tarefa.');
      return;
    }
    const todos = getTodoStorage();
    todos.push({ text, completed: false });
    setTodoStorage(todos);
    document.getElementById('todoText').value = '';
    refreshTasks();
    setResult('Tarefa adicionada com sucesso.');
  });

  refreshTasks();
}

function renderStopwatch() {
  const display = document.createElement('div');
  display.className = 'result-box';
  display.innerHTML = '<p id="stopwatchDisplay">00:00:00</p>';
  const startButton = createButton('Iniciar');
  const pauseButton = createButton('Pausar');
  const resetButton = createButton('Zerar');
  const controls = document.createElement('div');
  controls.className = 'controls-row';
  controls.append(startButton, pauseButton, resetButton);
  exerciseResult.appendChild(display);
  exerciseControls.append(controls);

  const stopwatchText = display.querySelector('#stopwatchDisplay');

  function formatTime(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  function updateDisplay() {
    stopwatchText.textContent = formatTime(state.stopwatchTime);
  }

  startButton.addEventListener('click', () => {
    if (state.stopwatch) return;
    state.stopwatch = setInterval(() => {
      state.stopwatchTime += 1;
      updateDisplay();
    }, 1000);
  });

  pauseButton.addEventListener('click', () => {
    clearInterval(state.stopwatch);
    state.stopwatch = null;
  });

  resetButton.addEventListener('click', () => {
    clearInterval(state.stopwatch);
    state.stopwatch = null;
    state.stopwatchTime = 0;
    updateDisplay();
  });

  updateDisplay();
}

function renderDebounceExample() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Pesquisar', 'debounceInput'));
  field.appendChild(createInput('text', 'debounceInput', 'Digite algo e veja o debounce...'));
  const info = document.createElement('p');
  info.textContent = 'Aguarde 700ms após digitar para que o resultado seja atualizado.';
  const resultText = document.createElement('p');
  resultText.textContent = 'Nenhuma pesquisa realizada ainda.';
  exerciseResult.appendChild(resultText);
  const button = createButton('Limpar');
  button.addEventListener('click', () => {
    document.getElementById('debounceInput').value = '';
    resultText.textContent = 'Nenhuma pesquisa realizada ainda.';
  });
  exerciseControls.append(field, info, button);

  let debounceTimer = null;
  document.getElementById('debounceInput').addEventListener('input', (event) => {
    const value = event.target.value.trim();
    resultText.textContent = 'Digitando...';
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      resultText.textContent = value ? `Resultado da pesquisa: ${value}` : 'Nenhuma pesquisa realizada ainda.';
    }, 700);
  });
}

function renderCustomPromise() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Segundos para aguardar', 'promiseSeconds'));
  field.appendChild(createInput('number', 'promiseSeconds', 'Ex: 3'));
  const button = createButton('Executar Promise');
  button.addEventListener('click', () => {
    const seconds = Number(document.getElementById('promiseSeconds').value);
    if (!Number.isInteger(seconds) || seconds <= 0) {
      showAlert('Digite um tempo em segundos maior que zero.');
      return;
    }
    setResult('Operação assíncrona em andamento...');
    createDelayPromise(seconds)
      .then((message) => setResult(message))
      .catch((error) => showAlert(error));
  });
  exerciseControls.append(field, button);
}

function createDelayPromise(seconds) {
  return new Promise((resolve, reject) => {
    if (seconds <= 0) {
      reject('Tempo inválido para a Promise.');
      return;
    }
    setTimeout(() => {
      resolve(`Promise resolvida após ${seconds} segundo(s).`);
    }, seconds * 1000);
  });
}

function renderShoppingCart() {
  const products = [
    { id: 1, name: 'Camiseta', price: 49.9 },
    { id: 2, name: 'Caneca', price: 24.5 },
    { id: 3, name: 'Notebook', price: 12.0 },
    { id: 4, name: 'Fone de ouvido', price: 79.9 },
  ];
  const cart = [];
  const listContainer = document.createElement('div');
  const totalDisplay = document.createElement('div');
  totalDisplay.className = 'result-box';
  totalDisplay.innerHTML = '<p>Total do carrinho: R$ 0,00</p>';
  exerciseResult.appendChild(listContainer);
  exerciseResult.appendChild(totalDisplay);

  function refreshCart() {
    listContainer.innerHTML = '';
    products.forEach((product) => {
      const item = document.createElement('div');
      item.className = 'result-box';
      item.innerHTML = `<strong>${product.name}</strong><br>${formatCurrency(product.price)}`;
      const buttonAdd = createButton('Adicionar ao carrinho', 'small-button');
      buttonAdd.addEventListener('click', () => {
        cart.push(product);
        updateSummary();
      });
      item.appendChild(buttonAdd);
      listContainer.appendChild(item);
    });
  }

  function updateSummary() {
    if (cart.length === 0) {
      totalDisplay.innerHTML = '<p>O carrinho está vazio.</p>';
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const summary = document.createElement('div');
    summary.innerHTML = `<strong>Itens no carrinho:</strong> ${cart.length}<br><strong>Valor total:</strong> ${formatCurrency(total)}`;
    totalDisplay.innerHTML = '';
    totalDisplay.appendChild(summary);
  }

  refreshCart();
}

function renderGuessingGame() {
  const description = document.createElement('p');
  description.textContent = 'Tente adivinhar um número entre 1 e 20. Você tem 6 tentativas.';
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Seu palpite', 'guessInput'));
  field.appendChild(createInput('number', 'guessInput', '1 a 20'));
  const button = createButton('Enviar palpite');
  const resetBtn = createButton('Reiniciar jogo', 'small-button');
  exerciseControls.append(description, field, button, resetBtn);
  state.guessNumber = Math.floor(Math.random() * 20) + 1;
  state.guessAttempts = 0;

  function updateStatus(message) {
    setResult(message);
  }

  button.addEventListener('click', () => {
    const guess = Number(document.getElementById('guessInput').value);
    if (!Number.isInteger(guess) || guess < 1 || guess > 20) {
      showAlert('Informe um palpite entre 1 e 20.');
      return;
    }
    state.guessAttempts += 1;
    if (guess === state.guessNumber) {
      updateStatus(`Parabéns! Você acertou em ${state.guessAttempts} tentativa(s).`);
      return;
    }
    if (state.guessAttempts >= 6) {
      updateStatus(`Fim de jogo! O número era ${state.guessNumber}.`);
      return;
    }
    const hint = guess < state.guessNumber ? 'Mais alto' : 'Mais baixo';
    updateStatus(`Errado. ${hint}. Tentativa ${state.guessAttempts}/6.`);
  });

  resetBtn.addEventListener('click', () => {
    state.guessNumber = Math.floor(Math.random() * 20) + 1;
    state.guessAttempts = 0;
    setResult('Jogo reiniciado. Boa sorte!');
    document.getElementById('guessInput').value = '';
  });
}

function renderDomManipulation() {
  const field = document.createElement('div');
  field.className = 'field-group';
  field.appendChild(createLabel('Texto do elemento', 'domText'));
  field.appendChild(createInput('text', 'domText', 'Ex: Novo item'));
  const addButton = createButton('Criar elemento');
  const listContainer = document.createElement('div');
  exerciseResult.appendChild(listContainer);
  exerciseControls.append(field, addButton);

  function addElement(text) {
    const elementBox = document.createElement('div');
    elementBox.className = 'result-box';
    const content = document.createElement('p');
    content.textContent = text;
    const row = document.createElement('div');
    row.className = 'controls-row';
    const editBtn = createButton('Editar', 'small-button');
    const removeBtn = createButton('Remover', 'small-button');
    editBtn.addEventListener('click', () => {
      const newText = prompt('Novo texto:', content.textContent);
      if (newText !== null && newText.trim()) {
        content.textContent = newText.trim();
      }
    });
    removeBtn.addEventListener('click', () => {
      elementBox.remove();
    });
    row.append(editBtn, removeBtn);
    elementBox.append(content, row);
    listContainer.appendChild(elementBox);
  }

  addButton.addEventListener('click', () => {
    const text = document.getElementById('domText').value.trim();
    if (!text) {
      showAlert('Digite um texto para criar o elemento.');
      return;
    }
    addElement(text);
    document.getElementById('domText').value = '';
  });
}

function renderBankSystem() {
  const actionField = document.createElement('div');
  actionField.className = 'field-group';
  actionField.appendChild(createLabel('Valor', 'bankAmount'));
  actionField.appendChild(createInput('number', 'bankAmount', 'Ex: 150,00'));
  const depositBtn = createButton('Depositar');
  const withdrawBtn = createButton('Sacar');
  const balanceBtn = createButton('Consultar saldo', 'small-button');
  const statementBtn = createButton('Ver extrato', 'small-button');
  const buttonsRow = document.createElement('div');
  buttonsRow.className = 'controls-row';
  buttonsRow.append(depositBtn, withdrawBtn, balanceBtn, statementBtn);
  exerciseControls.append(actionField, buttonsRow);

  function updateStatus(message) {
    setResult(message);
  }

  function addTransaction(type, amount) {
    state.bankAccount.transactions.push({ type, amount, date: new Date().toLocaleString() });
  }

  depositBtn.addEventListener('click', () => {
    const amount = Number(document.getElementById('bankAmount').value);
    if (Number.isNaN(amount) || amount <= 0) {
      showAlert('Informe um valor positivo para depositar.');
      return;
    }
    state.bankAccount.balance += amount;
    addTransaction('Depósito', amount);
    updateStatus(`Depósito realizado: ${formatCurrency(amount)}. Saldo atual: ${formatCurrency(state.bankAccount.balance)}.`);
    document.getElementById('bankAmount').value = '';
  });

  withdrawBtn.addEventListener('click', () => {
    const amount = Number(document.getElementById('bankAmount').value);
    if (Number.isNaN(amount) || amount <= 0) {
      showAlert('Informe um valor positivo para sacar.');
      return;
    }
    if (amount > state.bankAccount.balance) {
      updateStatus('Saldo insuficiente. Saque não autorizado.');
      return;
    }
    state.bankAccount.balance -= amount;
    addTransaction('Saque', amount);
    updateStatus(`Saque realizado: ${formatCurrency(amount)}. Saldo atual: ${formatCurrency(state.bankAccount.balance)}.`);
    document.getElementById('bankAmount').value = '';
  });

  balanceBtn.addEventListener('click', () => {
    updateStatus(`Saldo atual: ${formatCurrency(state.bankAccount.balance)}.`);
  });

  statementBtn.addEventListener('click', () => {
    if (state.bankAccount.transactions.length === 0) {
      updateStatus('Nenhuma transação realizada ainda.');
      return;
    }
    const list = state.bankAccount.transactions.map((transaction) => `${transaction.date} — ${transaction.type}: ${formatCurrency(transaction.amount)}`);
    setResultHTML(`<strong>Extrato:</strong><br><code>${list.join('\n')}</code>`);
  });
}

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

buildMenu();
loadExercise(state.activeExercise);
