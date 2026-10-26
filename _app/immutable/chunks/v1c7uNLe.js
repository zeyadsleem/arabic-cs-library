const s="kinney",a="testing",n="مدخل إلى الاختبارات",t="asymmetric-matching-example",p="التعامل مع بنى بيانات كبيرة في الاختبار",l=[],u=`<p>الأمثلة الصغيرة التي لدينا سهلة الفهم، لكنها لا تعرض دائمًا ما قد تراه في الواقع على نحو سليم. (هذا في الغالب لأن استيعاب قاعدة شيفرة كبيرة بالكامل قد يستغرق أيامًا أو أسابيع، لذا أختار تبسيط الأمور قليلًا.)</p>
<p>لن أُشغلك بتفاصيل التطبيق الذي أعمل عليه، لكن لدينا أشياء تسمى <strong>سير العمل (Workflows)</strong>، ولها <strong>سجل أحداث (Event History)</strong> يتكوّن من <strong>أحداث (Events)</strong>. أخذت أحد تلك الأحداث الخام. من أجل متعة مشاهدتك، ها هو:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;5&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Marker: Version&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;events&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;eventIds&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;initialEvent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;eventId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;5&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;eventTime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2022-07-01T20:28:48.820951669Z&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;eventType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;MarkerRecorded&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;taskId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;29887307&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;markerRecordedEventAttributes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;markerName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Version&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;details&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;change-id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
              <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ImluaXRpYWwgdmVyc2lvbiI=&quot;</span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
              <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Mw==&quot;</span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;workflowTaskCompletedEventId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;4&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;header&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;failure&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;attributes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;markerRecordedEventAttributes&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;markerName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Version&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;details&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;change-id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
              <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ImluaXRpYWwgdmVyc2lvbiI=&quot;</span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
              <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Mw==&quot;</span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;workflowTaskCompletedEventId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;4&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;header&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;failure&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;marker&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;5&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;MarkerRecorded&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2022-07-01 UTC 20:28:48.82&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2022-07-01 UTC 20:28:48.82&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;marker&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;eventTime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2022-07-01T20:28:48.820951669Z&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;attributes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;markerRecordedEventAttributes&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;markerName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Version&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;details&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;change-id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
          <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
            <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ImluaXRpYWwgdmVyc2lvbiI=&quot;</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
          <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
            <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Mw==&quot;</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;workflowTaskCompletedEventId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;4&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;header&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;failure&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;eventList&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;eventId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;5&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;eventTime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2022-07-01T20:28:48.820951669Z&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;eventType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;MarkerRecorded&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;taskId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;29887307&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;markerRecordedEventAttributes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;markerName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Version&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;details&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;change-id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
              <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                  <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
                <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
                <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ImluaXRpYWwgdmVyc2lvbiI=&quot;</span>
              <span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">]</span>
          <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
              <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                  <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
                <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
                <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Mw==&quot;</span>
              <span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">]</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;workflowTaskCompletedEventId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;4&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;header&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;failure&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;attributes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;markerRecordedEventAttributes&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;markerName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Version&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;details&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;change-id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
              <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                  <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
                <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
                <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ImluaXRpYWwgdmVyc2lvbiI=&quot;</span>
              <span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">]</span>
          <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
              <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                  <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
                <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
                <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Mw==&quot;</span>
              <span class="hljs-punctuation">}</span>
            <span class="hljs-punctuation">]</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;workflowTaskCompletedEventId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;4&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;header&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;failure&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;marker&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;5&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;MarkerRecorded&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2022-07-01 UTC 20:28:48.82&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;lastEvent&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;eventId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;5&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;eventTime&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2022-07-01T20:28:48.820951669Z&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;eventType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;MarkerRecorded&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;0&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;taskId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;29887307&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;markerRecordedEventAttributes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;markerName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Version&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;details&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;change-id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
              <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ImluaXRpYWwgdmVyc2lvbiI=&quot;</span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
              <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Mw==&quot;</span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;workflowTaskCompletedEventId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;4&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;header&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;failure&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;attributes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;markerRecordedEventAttributes&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;markerName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Version&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;details&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;change-id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
              <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ImluaXRpYWwgdmVyc2lvbiI=&quot;</span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;version&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;payloads&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
                <span class="hljs-attr">&quot;encoding&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;anNvbi9wbGFpbg==&quot;</span>
              <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Mw==&quot;</span>
            <span class="hljs-punctuation">}</span>
          <span class="hljs-punctuation">]</span>
        <span class="hljs-punctuation">}</span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;workflowTaskCompletedEventId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;4&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;header&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;failure&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;marker&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;5&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;MarkerRecorded&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;timestamp&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2022-07-01 UTC 20:28:48.82&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;isFailureOrTimedOut&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;isCanceled&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;isTerminated&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>بصراحة، لا أتوقع منك استيعابه. أريد فقط أن تدرك أنه كبير. في تطبيقنا، نأخذ تلك البيانات الخام ونعيد تشكيلها إلى بنية بيانات أكثر قابلية للإدارة قليلًا، لكنها لا تزال معقدة.</p>
<p><a href="https://stevekinney.com/courses/testing/asymmetric-matchers">المطابقات غير المتماثلة</a> تتيح لي وضع بعض الافتراضات الخفيفة التي تُبقي اختباراتي مركّزة على ما ينبغي أن تختبره بالضبط. وإن تغيّر جزء آخر من بنية البيانات، فلا يهمني كثيرًا.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:l,html:u};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,u as html,t as slug,p as title};
