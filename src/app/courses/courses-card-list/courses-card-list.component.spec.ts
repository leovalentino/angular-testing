import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  //it's a utility test to execute commands such as debug or create an instance of component, access the DOM of the component
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
     imports: [CoursesModule]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should display the course list', () => {
    component.courses = setupCourses();
    //to update the component and its template
    fixture.detectChanges();
    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12, 'Unexpected number of courses');
  });


  it('should display the first course', () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[0];
    const card = el.query(By.css('.course-card:first-child'));
    const title = card.query(By.css('mat-card-title'));
    const image = card.query(By.css('img'));
    expect(card).toBeTruthy('Could not find card');
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });


});


