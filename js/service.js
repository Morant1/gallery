'use strict';
var gProjects;
var NUM_OF_PROJECTS = 3;
var gLocalProjects = {
    1:{
        name:'Minesweeper Game',
        description: 'a known game with some additions built with JS ,HTML5 & CSS3',
        category: ['&#35;games','&#35;JavaScript'],
    },
    2:{
        name:'Manage your Books',
        description: 'manage your books in a simple way,built with JS ,HTML5 & CSS3',
        category: ['&#35;games','&#35;JavaScript']
    },
    3: {
        name: 'Touch the nums',
        description:'a fun game built with JS ,HTML5 & CSS3',
        category: ['&#35;games','&#35;JavaScript']
    }
};


function createProjects() {
    gProjects = [];
    for (var i = 1; i <= NUM_OF_PROJECTS ; i++) {
        console.log(i);
        var currProject = gLocalProjects[i];
        gProjects.push(_createProject(i,currProject.name, currProject.description, currProject.category));

    }
    return gProjects;
}

function _createProject(id, name,desc,category) {
    var project = {
        id,
        name,
        desc,
        url: `img/portfolio/${id}.png`,
        publishedAt: new Date().toLocaleString(),
        category
    };

    return project;
}

function getProjectById(id) {
    var projIdx = gProjects.findIndex(function (project) {
        return id === project.id;
    });

    return gProjects[projIdx];

}


