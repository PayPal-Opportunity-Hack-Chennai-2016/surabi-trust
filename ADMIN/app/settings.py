#Importing libs
from datetime import datetime

#DB configuration
MONGO_DBNAME = "surabi"
MONGO_HOST = "localhost"
MONGO_PORT = 27017

#Resource endpoint restrictions
RESOURCE_METHODS = ['GET', 'POST']
ITEM_METHODS = ['GET', 'PATCH','PUT']


#URL_PREFIX
URL_PREFIX = "api/admin"

#Admin - schema def
admin_schema = {
    'name' : {
        'type' : 'string',
        'required' : True
    },
    'email' : {
        'type' : 'string',
        'required' : True
    },
    'password' : {
        'type' : 'string',
        'required' : True
    }
}

#Mentor - schema def
mentor_schema = {
    'name' : {
        'type' : 'string',
        'required' : True
    },
    'type' : {
        'type' : 'number',
        'required' : True
    },
    'age' : {
        'type' : 'number',
        'required' : True
    },
    'gender' : {
        'type' : 'number',
        'required' : True
    },
    'location' : {
        'type' : 'string',
        'required' : True
    },
    'phone' : {
        'type' : 'number',
        'required' : True
    },
    'email' : {
        'type' : 'string',
        'required' : True
    },
    'password' : {
        'type' : 'string',
        'required' : True
    },
    'education' : {
        'type' : 'string',
        'required' : True
    },
    'picture' : {
        'type' : 'string'
    },
    'isApproved' : {
        'type' : 'boolean',
        'required' : True,
        'default' : False
    },
    'skills' : {
        'type' : 'list',
        'schema' : {
            'type' : 'string'
        }
    },
    'support' : {
        'type' : 'dict',
        'schema' : {
            'mentorType' : {
                'type' : 'number'
            },
            'name' : {
                'type' : 'string'
            },
            'phone' : {
                'type' : 'number'
            },
            'email' : {
                'type' : 'string'
            },
            'location' : {
                'type' : 'string'
            }
        }
    }
}

#Student - schema def
student_schema = {
    'name' : {
        'type' : 'string',
        'required' : True
    },
    'age' : {
        'type' : 'number',
        'required' : True
    },
    'gender' : {
        'type' : 'number',
        'required' : True
    },
    'location' : {
        'type' : 'string',
        'required' : True
    },
    'education' : {
        'type' : 'string',
        'required' : True
    },
    'phone' : {
        'type' : 'number',
        'required' : True
    },
    'email' : {
        'type' : 'string',
        'required' : True
    },
    'profile' : {
        'type' : 'string'
    },
    'tags' : {
        'type' : 'list',
        'schema' : {
            'type' : 'string'
        }
    },
    'interests' : {
        'type' : 'list',
        'schema' : {
            'type' : 'string'
        }
    },
    'isApproved' : {
        'type' : 'string',
        'default' : False
    }
}

#Assignment - schema def
assignment_schema = {
    'course_id' : {
        'type':'ObjectId'
    },
    'mentor_id' : {
        'type':'ObjectId'
    },
    'student_id' : {
        'type':'ObjectId'
    },
    'deadline' : {
        'type' : 'datetime'
    },
    'created_at' : {
        'type' : 'datetime',
        'default' : datetime.now()
    },
    'updated_at' : {
        'type' : 'datetime',
        'default' : datetime.now()
    },
    'assignment' : {
        'type' : 'dict',
        'schema' : {
            'description' : {
                'type' : 'string'
            },
            'date' : {
                'type' : 'string'
            },
            'submission' : {
                'type' : 'list',
                'schema' : {
                    'type' : 'string'
                }
            },
            'status' : {
                'type' : 'boolean'
            }
        }
    }
}

#Course - schema def
course_schema = {
    'name' : {
        'type' : 'string',
        'required' : True
    },
    'keywords' : {
        'type' : 'list',
        'schema' : {
            'type' : 'string'
        }
    },
    'description' : {
        'type' : 'string',
        'required' : True
    },
    'duration' : {
        'type' : 'number',
        'required' : True
    },
    'type' : {
        'type' : 'string',
        'required' : True
    },
    'isAchieved' : {
        'type' : 'boolean',
        'required' : True,
        'default' : False
    },
    'videoUrl' : {
        'type' : 'string'
    },
    'mentorId' : {
        'type' : 'ObjectId',
        'required' : True
    },
    'created_at' : {
        'type' : 'string',
        'required' : True,
        'default' : datetime.now()
    },
    'slots': {
        'type' : 'list',
        'schema' : {
            'type' : 'dict',
            'schema' : {
                'from' : {
                    'type' : 'string',
                    'required' : True
                },
                'to' : {
                    'type' : 'string',
                    'required' : True
                },
                'student_id' : {
                    'type' : 'ObjectId',
                    'required' : True
                }
            }
        }
    }
}

#Admin - schema def
admin = {
    "schema" : admin_schema
}

#Mentor - schema def
mentor = {
    "schema" : mentor_schema
}

#Student - schema def
student = {
    "schema" : student_schema
}

#Assignment - schema def
assignment = {
    "schema" : assignment_schema
}

#course - schema def
course = {
    "schema" : course_schema
}

#DOMAIN dict
DOMAIN  = {
    'Admin' : admin,
    'Mentor' : mentor,
    'Student' : student,
    'Assignment' : assignment,
    'Course' : course
}
