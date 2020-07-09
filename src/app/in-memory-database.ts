import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/shared/category.model';

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
        return { categories };
    }
}
