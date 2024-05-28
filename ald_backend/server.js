import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('ald', 'root', 'Areesha1$', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define existing models
const Judgment = sequelize.define('Judgment', {
  judgmentId: { type: DataTypes.INTEGER, primaryKey: true },
  judgmentCitation: DataTypes.STRING,
  judgmentNo: DataTypes.STRING,
  judgmentYear: DataTypes.STRING,
  judgmentNoText: DataTypes.TEXT,
  judgmentDOJ: DataTypes.STRING,
  judgmentType: DataTypes.STRING,
  judgmentPetitioner: DataTypes.TEXT,
  judgmentRespondent: DataTypes.TEXT,
  judgmentParties: DataTypes.TEXT,
  courtId: DataTypes.INTEGER,
  judgmentCourtText: DataTypes.TEXT,
  judgmentPetitionerCouncil: DataTypes.TEXT,
  judgmentRespondentCouncil: DataTypes.TEXT,
  judgmentOtherCounsel: DataTypes.TEXT,
  operatorId: DataTypes.INTEGER,
  judgmentEntryDate: DataTypes.STRING,
  judgmentJudges: DataTypes.STRING,
  judgmentDocFile: DataTypes.STRING,
  judgmentJudicialObservation: DataTypes.TEXT,
}, {
  tableName: 'judgment',
  timestamps: false,
});

const JudgmentText = sequelize.define('JudgmentText', {
  judgementTextId: { type: DataTypes.INTEGER, primaryKey: true },
  judgmentId: { type: DataTypes.INTEGER, references: { model: Judgment, key: 'judgmentId' } },
  judgementTextHTML: DataTypes.TEXT,
  judgementTextDeliveredBy: DataTypes.TEXT,
  judgementTextResult: DataTypes.TEXT,
  judgementTextNo: DataTypes.INTEGER,
}, {
  tableName: 'judgementtext',
  timestamps: false,
});

const JudgmentTextPara = sequelize.define('JudgmentTextPara', {
  judgementTextParaId: { type: DataTypes.INTEGER, primaryKey: true },
  judgementTextId: { type: DataTypes.INTEGER, references: { model: JudgmentText, key: 'judgementTextId' } },
  judgementTextParaNo: DataTypes.STRING,
  judgementTextParaText: DataTypes.TEXT,
  judgementTextParaType: DataTypes.STRING,
}, {
  tableName: 'judgementtextpara',
  timestamps: false,
});

// Define new models with new table names and relationships
const ShortNote = sequelize.define('ShortNote', {
  shortNoteId: { type: DataTypes.INTEGER, primaryKey: true },
  judgmentId: { type: DataTypes.INTEGER, references: { model: Judgment, key: 'judgmentId' } },
  shortNoteText: DataTypes.TEXT,
}, {
  tableName: 'shortnote',
  timestamps: false,
});

const ShortNotePara = sequelize.define('ShortNotePara', {
  shortNoteParaId: { type: DataTypes.INTEGER, primaryKey: true },
  shortNoteId: { type: DataTypes.INTEGER, references: { model: ShortNote, key: 'shortNoteId' } },
  shortNoteParaText: DataTypes.TEXT, 
  shortNoteParaLink: DataTypes.TEXT, 
  shortNoteParaJudgmentNo: DataTypes.INTEGER, 
}, {
  tableName: 'shortnotepara',
  timestamps: false,
});

const LongNote = sequelize.define('LongNote', {
  longNoteId: { type: DataTypes.INTEGER, primaryKey: true },
  shortNoteId: { type: DataTypes.INTEGER, references: { model: ShortNote, key: 'shortNoteId' } },
  longNoteText: DataTypes.TEXT,
}, {
  tableName: 'longnote',
  timestamps: false,
});


const LongNotePara = sequelize.define('LongNotePara', {
  longNoteParaId: { type: DataTypes.INTEGER, primaryKey: true },
  longNoteId: { type: DataTypes.INTEGER, references: { model: LongNote, key: 'longNoteId' } },
  longNoteParaText: DataTypes.TEXT,
}, {
  tableName: 'longnotepara',
  timestamps: false,
});

const judgmentsCited = sequelize.define('judgmentsCited', {
  judgmentsCitedId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  judgementTextId: { type: DataTypes.INTEGER, references: { model: JudgmentText, key: 'judgementTextId' } },
  judgmentsCitedParties: { type: DataTypes.STRING, allowNull: true },
  judgmentsCitedReferredCitation: { type: DataTypes.TEXT, allowNull: true },
  judgmentsCitedEqualCitation: { type: DataTypes.TEXT, allowNull: true },
  judgmentsCitedParaLink: { type: DataTypes.TEXT, allowNull: true },
  judgmentsCitedText: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'judgmentscited',
  timestamps: false
});

const Topic = sequelize.define('Topic', {
  topicId: { type: DataTypes.INTEGER, primaryKey: true },
  topicName: { type: DataTypes.STRING(300) },
}, {
  tableName: 'topic',
  timestamps: false,
});

const Orders = sequelize.define('Orders', {
  ordersId: { type: DataTypes.INTEGER, primaryKey: true },
  ordersName: { type: DataTypes.STRING(200) },
  ordersCitation: { type: DataTypes.STRING(20) },
  ordersDateTime: { type: DataTypes.STRING(20) },
  ordersFile: { type: DataTypes.STRING(200) },
  ordersAuthor: { type: DataTypes.STRING(100) },
}, {
  tableName: 'orders',
  timestamps: false,
});


const JudgmentTopics = sequelize.define('JudgmentTopics', {
  judgmentTopicsId: { type: DataTypes.INTEGER, primaryKey: true },
  judgmentId: { type: DataTypes.INTEGER, references: { model: Judgment, key: 'judgmentId' } },
  topicId: { type: DataTypes.INTEGER, references: { model: Topic, key: 'topicId' } },
}, {
  tableName: 'judgmenttopics',
  timestamps: false,
});


const JudgmentStatusType = sequelize.define('JudgmentStatusType', {
  judgmentStatusTypeId: { type: DataTypes.INTEGER, primaryKey: true },
  judgmentStatusTypeName: { type: DataTypes.STRING(200) },
  judgmentStatusTypeText: { type: DataTypes.TEXT },
}, {
  tableName: 'judgmentstatustype',
  timestamps: false,
});


const JudgmentStatus = sequelize.define('JudgmentStatus', {
  judgmentStatusId: { type: DataTypes.INTEGER, primaryKey: true },
  judgmentStatusTypeId: { type: DataTypes.INTEGER, references: { model: JudgmentStatusType, key: 'judgmentStatusTypeId' } },
  judgmentId: { type: DataTypes.INTEGER, references: { model: Judgment, key: 'judgmentId' } },
  judgmentStatusALDCitation: { type: DataTypes.STRING(200) },
  judgmentStatusLinkCitation: { type: DataTypes.STRING(200) },
  judgmentStatusLeftRight: { type: DataTypes.STRING }, // Assuming it's a string, you can adjust the type as needed
}, {
  tableName: 'judgmentstatus',
  timestamps: false,
});




const JudgmentCaseNos = sequelize.define('JudgmentCaseNos', {
  judgmentCaseNosId: { type: DataTypes.INTEGER, primaryKey: true },
  judgmentId: { type: DataTypes.INTEGER, references: { model: Judgment, key: 'judgmentId' } },
  judgmentCaseNo: { type: DataTypes.STRING(100) },
  judgmentCaseYear: { type: DataTypes.STRING(10) },
}, {
  tableName: 'judgmentcasenos',
  timestamps: false,
});


const Judge = sequelize.define('Judge', {
  judgeId: { type: DataTypes.INTEGER, primaryKey: true },
  judgeName: { type: DataTypes.STRING(200) },
}, {
  tableName: 'judge',
  timestamps: false,
});


const CourtType = sequelize.define('CourtType', {
  courtTypeId: { type: DataTypes.INTEGER, primaryKey: true },
  courtTypeName: { type: DataTypes.STRING(200) },
  courtTypeDesc: { type: DataTypes.TEXT },
}, {
  tableName: 'courttype',
  timestamps: false,
});


const Court = sequelize.define('Court', {
  courtId: { type: DataTypes.INTEGER, primaryKey: true },
  courtTypeId: { type: DataTypes.INTEGER, references: { model: CourtType, key: 'courtTypeId' } },
  courtName: { type: DataTypes.STRING(200) },
  courtShortName: { type: DataTypes.STRING(20) },
}, {
  tableName: 'court',
  timestamps: false,
});




const Citation = sequelize.define('Citation', {
  citationId: { type: DataTypes.INTEGER, primaryKey: true },
  judgmentId: { type: DataTypes.INTEGER, references: { model: Judgment, key: 'judgmentId' } },
  publicationYearId: { type: DataTypes.INTEGER },
  courtId: { type: DataTypes.INTEGER, references: { model: Court, key: 'courtId' } },
  citationText: { type: DataTypes.STRING(200) },
  publicationVolume: { type: DataTypes.STRING(100) },
  publicationPart: { type: DataTypes.STRING(100) },
  citationCourtName: { type: DataTypes.STRING(200) },
  citationPageNo: { type: DataTypes.INTEGER },
  citationBench: { type: DataTypes.STRING(10) },
}, {
  tableName: 'citation',
  timestamps: false,
});

const EqualCitation = sequelize.define('EqualCitation', {
    equalCitationId: { type: DataTypes.INTEGER, primaryKey: true },
    judgmentId: { type: DataTypes.INTEGER, references: { model: Judgment, key: 'judgmentId' } },
    equalCitationText: { type: DataTypes.STRING(300) },
  }, {
    tableName: 'equalcitation',
    timestamps: false,
  });




// Define associations
Judgment.hasMany(JudgmentText, { foreignKey: 'judgmentId' });
JudgmentText.belongsTo(Judgment, { foreignKey: 'judgmentId' });

JudgmentText.hasMany(JudgmentTextPara, { foreignKey: 'judgementTextId' });
JudgmentTextPara.belongsTo(JudgmentText, { foreignKey: 'judgementTextId' });

JudgmentText.hasMany(judgmentsCited, { foreignKey: 'judgementTextId' });
judgmentsCited.belongsTo(JudgmentText, { foreignKey: 'judgementTextId' });

Judgment.hasMany(ShortNote, { foreignKey: 'judgmentId' });
ShortNote.belongsTo(Judgment, { foreignKey: 'judgmentId' });


Judgment.hasMany(JudgmentTopics, { foreignKey: 'judgmentId' });
JudgmentTopics.belongsTo(Judgment, { foreignKey: 'judgmentId' });

Judgment.hasMany(JudgmentStatus, { foreignKey: 'judgmentId' });
JudgmentStatus.belongsTo(Judgment, { foreignKey: 'judgmentId' });

Judgment.hasMany(JudgmentCaseNos, { foreignKey: 'judgmentId' });
JudgmentCaseNos.belongsTo(Judgment, { foreignKey: 'judgmentId' });

Judgment.hasMany(Citation, { foreignKey: 'judgmentId' });
Citation.belongsTo(Judgment, { foreignKey: 'judgmentId' });




ShortNote.hasMany(ShortNotePara, { foreignKey: 'shortNoteId' });
ShortNotePara.belongsTo(ShortNote, { foreignKey: 'shortNoteId' });

ShortNote.hasMany(LongNote, { foreignKey: 'shortNoteId' });
LongNote.belongsTo(ShortNote, { foreignKey: 'shortNoteId' });

LongNote.hasMany(LongNotePara, { foreignKey: 'longNoteId' });
LongNotePara.belongsTo(LongNote, { foreignKey: 'longNoteId' });


Topic.hasMany(JudgmentTopics, { foreignKey: 'topicId' });
JudgmentTopics.belongsTo(Topic, { foreignKey: 'topicId' });


// JudgmentStatusType and JudgmentStatus
JudgmentStatusType.hasMany(JudgmentStatus, { foreignKey: 'judgmentStatusTypeId' });
JudgmentStatus.belongsTo(JudgmentStatusType, { foreignKey: 'judgmentStatusTypeId' });

// Court and related tables
Court.hasMany(Citation, { foreignKey: 'courtId' });
Citation.belongsTo(Court, { foreignKey: 'courtId' });

CourtType.hasMany(Court, { foreignKey: 'courtTypeId' });
Court.belongsTo(CourtType, { foreignKey: 'courtTypeId' });

//Equals
Judgment.hasMany(EqualCitation, { foreignKey: 'judgmentId' });
EqualCitation.belongsTo(Judgment, { foreignKey: 'judgmentId' });

// API endpoint for shortnote search
app.post('/judgments/search', async (req, res) => {
    const { searchTerm } = req.body;
  
    try {
      const judgments = await Judgment.findAll({
        include: [
          {
            model: ShortNote,
            where: {
              shortNoteText: {
                [Op.like]: `%${searchTerm}%`
              }
            },
            attributes: ['shortNoteText']
          }
        ],
        attributes: ['id', 'title'] // Modify as needed
      });
  
      if (!judgments.length) {
        return res.status(404).json({ error: 'No judgments found' });
      }
  
      console.log('Fetched search results:', JSON.stringify(judgments, null, 2));
      res.json(judgments);
    } catch (error) {
      console.error('Error searching judgments:', error);
      res.status(500).send('Internal Server Error');
    }
  });
// API endpoint to fetch judgments along with related data
app.get('/judgments/:judgmentId', async (req, res) => {
    const { judgmentId } = req.params;
  
    try {
      const judgment = await Judgment.findByPk(judgmentId, {
        include: [
          {
            model: JudgmentText,
            include: [
              {
                model: JudgmentTextPara,
                attributes: ['judgementTextParaText']
              },
              {
                model: judgmentsCited,
                attributes: ['judgmentsCitedParties', 'judgmentsCitedRefferedCitation', 'judgmentsCitedEqualCitation', 'judgmentsCitedParaLink']
              }
            ]
          },
          {
            model: ShortNote,
            include: [
              {
                model: ShortNotePara,
                attributes: ['shortNoteParaText']
              },
              {
                model: LongNote,
                include: {
                  model: LongNotePara,
                  attributes: ['longNoteParaText']
                }
              }
            ],
            attributes: ['shortNoteText']
          },
          {
            model: JudgmentStatus,
            include: [JudgmentStatusType],
          },
          {
            model: EqualCitation,
            attributes: ['equalCitationText']
          }
        ]
      });
  
      if (!judgment) {
        return res.status(404).json({ error: 'Judgment not found' });
      }
  
      console.log('Fetched judgment data:', JSON.stringify(judgment, null, 2));
      res.json(judgment);
    } catch (error) {
      console.error('Error fetching judgment:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});