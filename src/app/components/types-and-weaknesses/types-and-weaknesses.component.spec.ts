import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TypesAndWeaknessesComponent } from './types-and-weaknesses.component';

describe('TypesAndWeaknessesComponent', () => {
  let component: TypesAndWeaknessesComponent;
  let fixture: ComponentFixture<TypesAndWeaknessesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesAndWeaknessesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypesAndWeaknessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
