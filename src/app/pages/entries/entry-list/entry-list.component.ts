import { Component, OnInit } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  entries: Entry[];
  constructor(private entryService: EntryService) { }


  ngOnInit(): void {
    this.entryService.getAll().subscribe(
      (entries: Entry[]) => {
        this.entries = entries;
        console.log(entries);
      }

    );
  }


  delete(id: number) {
    confirm('Deseja deletar?');
    this.entryService.deleteEntry(id).subscribe(
    );

  }


}
