var app = angular.module('ProfileApp', []);

app.controller("QualificationController", ['$scope', function ($scope) {
    this.school = {};
    this.project = {};   
    this.job = {};
    $scope.container = $.parseJSON($('#Qualification').val());
    $scope.globalSchoolIndex = -1;
    $scope.globalProjectIndex = -1;
    $scope.globaljobIndex = -1;
    $scope.openSchoolModel = function (schooldata, index) {
        $scope.AddSchool(-1);
        $('#addSchool').modal('hide');
        this.school.SchoolName = schooldata.SchoolName;
        this.school.Degree = schooldata.Degree;
        this.school.AreaOfStudy = schooldata.AreaOfStudy;
        this.school.DateFrom = schooldata.DateFrom;
        this.school.DateTo = schooldata.DateTo;
        this.school.Description = schooldata.Description;
        $scope.globalSchoolIndex = index;
        $('#addSchool').modal('show');
    }
    $scope.AddSchool = function (index) {
        this.school = {};
        this.school.DateFrom = '';
        this.school.DateTo = '';
        $scope.globalSchoolIndex = index;
    }
    $scope.schoolCancel = function () {
        this.school = {};
        $('#addSchool').modal('hide');
    }
    //updated the information of the school details on the page
    $scope.UpdateSchoolDetail = function (close) {
        //debugger;
        if ($scope.container.Schools != undefined) {
            var idx = $scope.globalSchoolIndex;
            if (idx >= 0) {
                $scope.container.Schools[idx].SchoolName = this.school.SchoolName;
                $scope.container.Schools[idx].Degree = this.school.Degree;
                $scope.container.Schools[idx].AreaOfStudy = this.school.AreaOfStudy;
                $scope.container.Schools[idx].DateFrom = this.school.DateFrom;
                $scope.container.Schools[idx].DateTo = this.school.DateTo;
                $scope.container.Schools[idx].Description = this.school.Description;                
            }
            else {
               
                $scope.container.Schools.push(this.school);
               
            }
        }
        else {
            $scope.container.Schools = [];
            $scope.container.Schools.push(this.school);
        }
        if (close == 1) {
            $('#addSchool').modal('hide');
        }
        this.school = {};
        $scope.globalSchoolIndex = -1;
    }
    //delete the clicked school
    $scope.deleteSchool = function (schooldata) {
        var idx = $scope.container.Schools.indexOf(schooldata);
        if (idx != -1) {
            $scope.container.Schools.splice(idx, 1);
        }        
    }

    //Project

    $scope.openProjectModel = function (Projectdata, index) {
        $scope.AddProject(-1);
        $('#addProject').modal('hide');        
        this.project.ProjectName = Projectdata.ProjectName;
        this.project.Organization = Projectdata.Organization;
        this.project.Projecturl = Projectdata.Projecturl;
        this.project.Teammembers = Projectdata.Teammembers;
        this.project.FromMonth = Projectdata.FromMonth;
        this.project.FromYear = Projectdata.FromYear;
        this.project.ToYear = Projectdata.ToYear;
        this.project.ToMonth = Projectdata.ToMonth;
        this.project.Description = Projectdata.Description;
        $scope.globalProjectIndex = index;
        $('#addProject').modal('show');
    }
    $scope.AddProject = function (index) {
        //debugger;
        this.project = {};
        this.project.FromMonth = '';
        this.project.FromYear = '';
        this.project.ToMonth = '';
        this.project.ToYear = '';
        $scope.globalProjectIndex = index;
    }
    $scope.ProjectCancel = function () {
        this.project = {};
        $('#addProject').modal('hide');

    }
    //updated the information of the Project details on the page
    $scope.UpdateProjectDetails = function (close) {
        //debugger;
        if ($scope.container.Projects != undefined) {
            var idx = $scope.globalProjectIndex;
            if (idx >= 0) {

                $scope.container.Projects[idx].ProjectName = this.project.ProjectName;
                $scope.container.Projects[idx].Organization = this.project.Organization;
                $scope.container.Projects[idx].Projecturl = this.project.Projecturl;
                $scope.container.Projects[idx].Teammembers = this.project.Teammembers;
                $scope.container.Projects[idx].FromMonth = this.project.FromMonth;
                $scope.container.Projects[idx].FromYear = this.project.FromYear;
                $scope.container.Projects[idx].ToYear = this.project.ToYear;
                $scope.container.Projects[idx].ToMonth = this.project.ToMonth;
                $scope.container.Projects[idx].Description = this.project.Description;               
            }
            else {

                $scope.container.Projects.push(this.project);

            }
        }
        else {
            $scope.container.Projects = [];
            $scope.container.Projects.push(this.project);
        }
        if (close == 1) {
            $('#addProject').modal('hide');
        }
        this.project = {};
        $scope.globalProjectIndex = -1;
    }
    //delete the clicked Project
    $scope.deleteProject = function (Projectdata) {
        //debugger;
        var idx = $scope.container.Projects.indexOf(Projectdata);
        if (idx != -1) {
            $scope.container.Projects.splice(idx, 1);
        }
    }

    //Job
    $scope.openjobModel = function (jobdata, index) {
        
        $scope.Addjob(-1);
        $('#addJob').modal('hide');        
        this.job.Organization = jobdata.Organization;
        this.job.City = jobdata.City;
        this.job.Country = jobdata.Country;
        this.job.CountryName = $("#jobCountry option:selected").text();
        this.job.Title = jobdata.Title;
        this.job.StartDate = jobdata.StartDate;
        this.job.EndDate = jobdata.EndDate;
        this.job.IsCurrentlyWorking = jobdata.IsCurrentlyWorking;
        this.job.Description = jobdata.Description;
        this.job.FromMonth = jobdata.FromMonth;
        this.job.FromYear = jobdata.FromYear;
        this.job.ToMonth = jobdata.ToMonth;
        this.job.ToYear = jobdata.ToYear;
        $scope.globaljobIndex = index;
        $('#addJob').modal('show');
    }
    $scope.Addjob = function (index) {
        //debugger;
        this.job = {};
        this.job.Country = '';
        this.job.FromMonth = '';
        this.job.FromYear = '';
        this.job.ToMonth = '';
        this.job.ToYear = '';
        $scope.globaljobIndex = index;
    }
    //updated the information of the job details on the page
    $scope.UpdatejobDetails = function (close) {
        //debugger;
        if ($scope.container.Jobs != undefined) {
            var idx = $scope.globaljobIndex;
            if (idx >= 0) {
                $scope.container.Jobs[idx].Organization = this.job.Organization;
                $scope.container.Jobs[idx].City = this.job.City;
                $scope.container.Jobs[idx].Country = this.job.Country;
                $scope.container.Jobs[idx].CountryName = $("#jobCountry option:selected").text();
                $scope.container.Jobs[idx].FromMonth = this.job.FromMonth;
                $scope.container.Jobs[idx].FromYear = this.job.FromYear;
                $scope.container.Jobs[idx].ToMonth = this.job.ToMonth;
                $scope.container.Jobs[idx].ToYear = this.job.ToYear;
                $scope.container.Jobs[idx].Title = this.job.Title;
                $scope.container.Jobs[idx].IsCurrentlyWorking = this.job.IsCurrentlyWorking;
                $scope.container.Jobs[idx].Description = this.job.Description;
            }
            else {
                this.job.CountryName = $("#jobCountry option:selected").text();
                $scope.container.Jobs.push(this.job);

            }
        }
        else {
            $scope.container.Jobs = [];
            $scope.container.Jobs.push(this.job);
        }
        if (close == 1) {
            $('#addJob').modal('hide');
        }
        this.job = {};
        $scope.globaljobIndex = -1;
    }
    //delete the clicked job
    $scope.deletejob = function (jobdata) {
        //debugger;
        var idx = $scope.container.Jobs.indexOf(jobdata);
        if (idx != -1) {
            $scope.container.Jobs.splice(idx, 1);
        }
    }

    $scope.SaveProfile = function () {
        //debugger;
        $("#Qualification").val(angular.toJson($scope.container));
    }

    $scope.setCurrenDate = function ()
    {
        //debugger;
        if (!$("#setCurrentDate").prop('checked')) {
            this.job.ToMonth = '';
            this.job.ToYear = '';
        }
        else {
            this.job.ToYear = (new Date).getFullYear();
            this.job.ToMonth = (new Date).getMonth() + 1
        }
    }
}]);

