import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMememoryDatabase implements InMemoryDbService {
    constructor() { }
    createDb() {
        const categories: Category[] = [
            { id: 1, name: 'Moradia', description: 'descrição' },
            { id: 2, name: 'Saúde', description: 'descrição' },
            { id: 3, name: 'Lazer', description: 'descrição' },
            { id: 4, name: 'Salario', description: 'descrição' },
            { id: 5, name: 'Freelas', description: 'descri' }
        ];

        const entries: Entry[] = [
            {
                id: 1, name: 'Gas de Cozinha', categoryId: categories[0].id, category: categories[0], paid: true,
                date: '14/10/2018', amount: '70,80', type: 'expense', description: 'descrição'
            } as Entry,
            {
                id: 4, name: 'Salario', categoryId: categories[0].id, category: categories[0], paid: true,
                date: '12/10/2018', amount: '2980,00', type: 'revenue', description: 'descrição'
            } as Entry,
            {
                id: 1, name: 'Aluguel', categoryId: categories[0].id, category: categories[0], paid: true,
                date: '14/10/2018', amount: '1000,00', type: 'revenue', description: 'descrição'
            } as Entry,
            {
                id: 2, name: 'Convenio', categoryId: categories[0].id, category: categories[0], paid: false,
                date: '20/10/2018', amount: '550,00', type: 'expense', description: 'descrição'
            } as Entry,
            {
                id: 3, name: 'Cinema', categoryId: categories[0].id, category: categories[0], paid: true,
                date: '23/10/2018', amount: '50,00', type: 'expense', description: 'descrição'
            } as Entry,
            {
                id: 3, name: 'Evento RedBull', categoryId: categories[0].id, category: categories[0], paid: true,
                date: '23/10/2018', amount: '50,00', type: 'revenue', description: 'descrição'
            } as Entry,

        ];
        return { categories, entries };
    }
}
