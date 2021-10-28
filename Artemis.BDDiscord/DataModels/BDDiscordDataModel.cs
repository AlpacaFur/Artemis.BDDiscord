using Artemis.Core;
using Artemis.Core.Modules;

namespace Artemis.BDDiscord.DataModels
{
    public class BDDiscordDataModel : DataModel
    {
        public User user { get; set; } = new User();
        public Guild guild { get; set; } = new Guild();
        public Text text { get; set; } = new Text();
        public Voice voice { get; set; } = new Voice();
    }

    public class User
    {
        public enum UserStatus
        {
            None,
            Online,
            Idle,
            DND,
            Invisible
        }
        [DataModelProperty(Name = "ID")]
        public string id { get; set; }
        [DataModelProperty(Name = "User Status")]
        public UserStatus status { get; set; }
        private int _mentions { get; set; }
        [DataModelProperty(Name = "Mentions")]
        public int mentions {
            get
            {
                return _mentions;
            }
            set
            {
                if (value > _mentions) Mention.Trigger();
                _mentions = value;
            }
        }
        [DataModelProperty(Name = "Is Mentioned")]
        public bool IsMentioned
        {
            get
            {
                return _mentions > 0;
            }
        }
        private int _unread_messages { get; set; }
        [DataModelProperty(Name = "Unread Servers")]
        public int unread_messages
        {
            get
            {
                return _unread_messages;
            }
            set
            {
                if (value > _unread_messages) NewUnreadServer.Trigger();
                _unread_messages = value;
            }
        }
        [DataModelProperty(Name = "Has Unread Servers")]
        public bool HasUnreadServers
        {
            get
            {
                return _unread_messages > 0;
            }
        }
        [DataModelProperty(Name = "Is Being Called")]
        public bool being_called { get; set; }
        [DataModelProperty(Name = "Is Muted")]
        public bool mute { get; set; }
        [DataModelProperty(Name = "Is Self-Muted")]
        public bool self_mute { get; set; }
        [DataModelProperty(Name = "Is Deafened")]
        public bool deafen { get; set; }
        [DataModelProperty(Name = "Is Self-Deafened")]
        public bool self_deafen { get; set; }
        
        public DataModelEvent Mention { get; set; } = new DataModelEvent();
        [DataModelProperty(Name = "New Unread Server")]
        public DataModelEvent NewUnreadServer { get; set; } = new DataModelEvent();
    }
    public class Guild
    {
        [DataModelProperty(Name = "ID")]
        public string id { get; set; }
        [DataModelProperty(Name = "Guild Name")]
        public string name { get; set; }
    }
    public class Text
    {
        public enum TextChannelType
        {
            None = -1,
            Server = 0,
            DM = 1,
            GroupDM = 3,
            ServerAnnouncements = 5
        }
        [DataModelProperty(Name = "Channel ID")]
        public string id { get; set; }
        [DataModelProperty(Name = "Channel Type")]
        public TextChannelType type { get; set; }
        [DataModelProperty(Name = "Channel Name")]
        public string name { get; set; }
    }
    public class Voice
    {
        public enum VoiceChannelType
        {
            None = -1,
            Call = 1,
            VoiceChannel = 2,
            GroupCall = 3
        }
        [DataModelProperty(Name = "Channel ID")]
        public string id { get; set; }
        [DataModelProperty(Name = "Channel Type")]
        public VoiceChannelType type { get; set; }
        [DataModelProperty(Name = "Channel Name")]
        public string name { get; set; }
    }
}
