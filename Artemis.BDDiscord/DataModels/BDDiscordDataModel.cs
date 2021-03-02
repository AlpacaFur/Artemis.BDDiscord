using Artemis.Core;
using Artemis.Core.DataModelExpansions;
using System.Collections.Generic;

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
            DnD,
            Invisible
        }
        [DataModelProperty(Name = "ID")]
        public string id { get; set; }
        [DataModelProperty(Name = "User Status")]
        public UserStatus status { get; set; }
        [DataModelProperty(Name = "Mentions")]
        public int Mentions
        {
            get
            {
                return mentions;
            }
            set
            {
                if (value > mentions) Mention.Trigger();
                mentions = value;
            }
        }
        private int mentions { get; set; }
        [DataModelProperty(Name = "Is Mentioned")]
        public bool IsMentioned
        {
            get
            {
                return mentions > 0;
            }
        }
        [DataModelProperty(Name = "Unread Messages")]
        public int UnreadMessages
        {
            get
            {
                return unread_messages;
            }
            set
            {
                if (value > unread_messages) UnreadMessage.Trigger();
                unread_messages = value;
            }
        }
        private int unread_messages { get; set; }
        [DataModelProperty(Name = "Has Unread Messages")]
        public bool HasUnreadMessages
        {
            get
            {
                return unread_messages > 0;
            }
        }
        [DataModelProperty(Name = "Is Being Called")]
        public bool being_called { get; set; }
        [DataModelProperty(Name = "Is Self-Muted")]
        public bool self_mute { get; set; }
        [DataModelProperty(Name = "Is Self-Deafened")]
        public bool self_deafen { get; set; }
        [DataModelProperty(Name = "Is Muted")]
        public bool mute { get; set; }
        [DataModelProperty(Name = "Is Deafened")]
        public bool deafen { get; set; }
        public DataModelEvent Mention { get; set; } = new DataModelEvent();
        public DataModelEvent UnreadMessage { get; set; } = new DataModelEvent();
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
            GroupDM = 3
        }
        [DataModelProperty(Name = "Channel ID")]
        public string id { get; set; }
        [DataModelProperty(Name = "Channel Type")]
        public string type { get; set; }
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