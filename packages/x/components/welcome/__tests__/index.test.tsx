import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vite-plus/test";

import Welcome from "../index";

describe("Welcome", () => {
  it("renders prop content", () => {
    const wrapper = mount(Welcome, {
      props: {
        icon: "https://example.com/icon.png",
        title: "Hello",
        description: "Description",
        extra: "More",
      },
    });

    expect(wrapper.find(".antd-welcome").exists()).toBe(true);
    expect(wrapper.find(".antd-welcome-icon img").attributes("src")).toBe(
      "https://example.com/icon.png",
    );
    expect(wrapper.find(".antd-welcome-title").text()).toContain("Hello");
    expect(wrapper.find(".antd-welcome-description").text()).toContain(
      "Description",
    );
    expect(wrapper.find(".antd-welcome-extra").text()).toContain("More");
  });

  it("renders slots over props", () => {
    const wrapper = mount(Welcome, {
      props: {
        title: "Prop Title",
        description: "Prop Description",
        extra: "Prop Extra",
      },
      slots: {
        icon: () => <span class="slot-icon">S</span>,
        title: () => "Slot Title",
        description: () => "Slot Description",
        extra: () => <button class="slot-extra">Action</button>,
      },
    });

    expect(wrapper.find(".slot-icon").exists()).toBe(true);
    expect(wrapper.find(".antd-welcome-title").text()).toContain("Slot Title");
    expect(wrapper.find(".antd-welcome-description").text()).toContain(
      "Slot Description",
    );
    expect(wrapper.find(".slot-extra").exists()).toBe(true);
    expect(wrapper.text()).not.toContain("Prop Title");
    expect(wrapper.text()).not.toContain("Prop Description");
    expect(wrapper.text()).not.toContain("Prop Extra");
  });

  it("renders numeric content", () => {
    const wrapper = mount(Welcome, {
      props: {
        title: 0,
        description: 1,
        extra: 2,
      },
    });

    expect(wrapper.find(".antd-welcome-title").text()).toContain("0");
    expect(wrapper.find(".antd-welcome-description").text()).toContain("1");
    expect(wrapper.find(".antd-welcome-extra").text()).toContain("2");
  });
});
