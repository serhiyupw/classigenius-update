import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  downloadSoftware()
  {
    console.log("download software");
    const link = document.createElement('a');
    link.href = 'https://sendli365.com/ClassiGenuisLandingPage/ClassiGeniusSetup.exe'; // path to installation file
    link.target = '_blank';
    link.download = 'ClassiGeniusSetup.exe'; // File name
    link.click();

  }

  downloadIntroductorySheet()
  {
    const link = document.createElement('a');
    link.href = 'https://sendli365.com/ClassiGenuisLandingPage/ClassiGeniusIntroductorySheet.pdf'; // path to pdf file
    link.target = '_blank';
    // link.download = 'ClassiGeniusIntroductorySheet.pdf'; // File name
    link.click();

  }
  downloadQuickStarterGuide()
  {
    const link = document.createElement('a');
    link.href = 'https://sendli365.com/ClassiGenuisLandingPage/ClassiGeniusQuickStarterGuide.pdf'; // path to pdf file
    link.target = '_blank';
    // link.download = 'ClassiGeniusQuickStarterGuide.pdf'; // File name
    link.click();
  }

}
